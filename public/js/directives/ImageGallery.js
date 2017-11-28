'use strict';

/*
 * Displays images from selected trip
 * author@ robinson
 */

angular.module( 'AfterView.ImageGallery', [] )

.directive( 'imageGallery', ['TripService', 'PastTripsMap', 'UrlManager', '$uibModal', function( TripService, PastTripsMap, UrlManager, $uibModal )
{
  return {
    restrict: 'E',
    templateUrl: 'templates/image-gallery.html',
    controllerAs: 'imageGalleryCtrl',
    // Bind to parent scope
    scope: {
      seltrip: '='
    },
    bindToController: true,
    controller: function( $scope )
    {
      // Data
      var that = this

      // Functions
      // Get information for selected trip
      this.getTripData = function( trip_name )
      {
        console.log( 'ImageGallery: getting data for trip: ' + this.seltrip );

        this.loading_images = true;
        this.progress_type = 'info';
        this.loading_text = 'Loading';

        // Get the duration
        TripService.getDuration( trip_name ).then(
          function( duration )
          {
            console.log( 'ImageGallery: Got response from TripService.getDuration()' );

            if( duration )
              that.seltrip_duration = duration;
          }
        );

        // Get the people
        TripService.getPeople( trip_name ).then(
          function( people )
          {
            console.log( 'ImageGallery: Got response from TripService.getPeople()' );

            if( people )
              that.seltrip_people = people;
          }
        );

        // Get the images
        TripService.getAllTripImages( trip_name ).then(
          function( images )
          {
            console.log( 'ImageGallery: Got response from TripService.getAllTripImages()' );

            if( images )
            {
              that.seltrip_images = images;
              // Change each element to be external location of image
              for( let i = 0; i < that.seltrip_images.length; ++i )
              {
                that.seltrip_images[i] = UrlManager.image_base_url + trip_name + '/' + that.seltrip_images[i] + '?token=' + TripService.getToken();
              }
            }
          }
        );
      };

      // Executed as callback for last ng-repeat element being rendered
      this.handleAllImagesRendered = function()
      {
        console.log( 'ImageGallery: all images have been rendered' );

        this.progress_type = 'success';
        this.loading_images = false
        this.loading_text = 'Done Loading';
      }

      // Custom Watchers
      // Watch the variable seltrip and calls getTripImages on digest if it is defined
      $scope.$watch(
        angular.bind( this,
          function()
          {
            return this.seltrip;
          }
        ),
        angular.bind( this,
          function()
          {
            if( this.seltrip )
            {
              console.log( 'ImageGallery: seltrip has changed to', this.seltrip );

              this.getTripData( this.seltrip );
            }
            else
              console.error( 'ImageGallery: seltrip is not defined' );
          }
        )
      );

      // Custom modals
      // This modal opens after clicking on image
      this.openImageCarousel = function( image_index )
      {
        let image_carousel_modal = $uibModal.open(
        {
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'templates/image-carousel.html',
          controllerAs: 'imageCarouselCtrl',
          controller: function( $uibModalInstance )
          {
            // Data
            this.current_image_src = that.seltrip_images[image_index];

            // Functions
            // Display new image
            this.handleKeyEvent = function( event )
            {
              console.log( 'imageCarouselCtrl: displaying next image' );
              console.log( 'event: ', event );

              console.log( document.activeElement );

              if( event.key === 'ArrowDown' )
              {
                image_index + 1 > that.seltrip_images.length - 1 ? image_index = 0 : ++ image_index;
                this.current_image_src = that.seltrip_images[image_index];
                console.log( image_index );
              }

              else if( event.key === 'ArrowUp' )
              {
                image_index - 1 < 0 ? image_index = that.seltrip_images.length - 1 : --image_index;
                this.current_image_src = that.seltrip_images[image_index];
                console.log( image_index );
              }

            };

            // Closes the modal
            this.cancel = function()
            {
              console.log( 'cancelling modal' );

              $uibModalInstance.dismiss( 'cancel' );
            };
          }
        });

        // Executed when modal is finished rendering
        image_carousel_modal.rendered.then(
          function()
          {
            console.log( 'modal rendered' );

            // Must be selected by querying activeElement otherwise doesn't seem to work
            document.activeElement.firstChild.firstChild.firstChild.focus();
            console.log( document.activeElement );
          }
        );
      };

    }
  }
}]);
