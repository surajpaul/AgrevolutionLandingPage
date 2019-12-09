(function($) {
    
  'use strict';


  /**
   * =====================================
   * Function for windows height and width      
   * =====================================
   */
  function windowSize( el ) {
    var result = 0;
    if("height" == el)
        result = window.innerHeight ? window.innerHeight : $(window).height();
    if("width" == el)
      result = window.innerWidth ? window.innerWidth : $(window).width();

    return result; 
  }


  /**
   * =====================================
   * Function for email address validation         
   * =====================================
   */
  function isValidEmail(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
  };


  /**
   * =====================================
   * Function for windows height and width      
   * =====================================
   */
  function deviceControll() {
    if( windowSize( 'width' ) < 768 ) {
      $('body').removeClass('desktop').removeClass('tablet').addClass('mobile');
    }
    else if( windowSize( 'width' ) < 992 ){
      $('body').removeClass('mobile').removeClass('desktop').addClass('tablet');
    }
    else {
      $('body').removeClass('mobile').removeClass('tablet').addClass('desktop');
    }
  }



  function fullpageInitialization( scrollOverflow ) {
    $('#fullpage').fullpage({
      hybrid:             false,
      scrollOverflow:     scrollOverflow,
      scrollBar:          false,
      keyboardScrolling:  true,
      scrollingSpeed:     900,
      verticalCentered:   true,
      easingcss3:         'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
      css3:               true,
      // navigation: true,
      // navigationPosition: 'left',
      // navigationTooltips: ['First page', 'Second page', 'Third and last page'],


      afterLoad: function(anchorLink, index){

        // console.log(index);

        if( index !== 1 ) {
          $('.navbar-top-js').addClass('navbar-home');
          $('#fp-nav').fadeIn(10).addClass('show-nav');
        } 
        else {
          $('.navbar-fixed-top').removeClass('navbar-home');
          $('#fp-nav').removeClass('show-nav');

          setTimeout(function() {
            $('#fp-nav').fadeOut(10);
          }, 600)
        }


        $('.section').each(function() {

          if( $(this).find('.inner-container').height() < windowSize('height') ) {
            $(this).find('.fp-tableCell, .slimScrollDiv, .fp-scrollable').css({
              'height': 'initial'
            })
          }else {
            $(this).find('.fp-tableCell, .slimScrollDiv, .fp-scrollable').css({
              'height': windowSize('height')
            })
          }
        })



        var navigationClickFullPage = '#navbar-nav, #fp-nav';
        $( navigationClickFullPage ).find('a').each( function() {

          if( '#' + index === $(this).attr('href') ) {
            $(this).closest( navigationClickFullPage ).find('.active').removeClass('active');
            $(this).addClass('active');
          }
          
        });


      },
      onLeave: function(index, nextIndex, direction){
        
        var ind             = index - 1,
            nextInd         = nextIndex - 1,
            beforeActioId   = $('.section').eq( ind ).attr('data-heading'),
            actionId        = $('.section').eq( nextInd ).attr('data-heading');

        
        // console.log(index-1, nextIndex-1, beforeActioId, actionId);



        if( $('.section').eq( nextInd ).hasClass('hide-overlay') || $( actionId ).hasClass('no-heading') ) {
          setTimeout(function() {
            $('.animate-text').css( 'z-index', -111 );
          }, 1300 );
          
        }else {
          $('.animate-text').css( 'z-index', 111 );
        }


        if( actionId === '' ) {
          var mainSection = $('.animate-text');
          mainSection.find('.active').removeClass('.active');
        }


        setTimeout(function() {
          $( beforeActioId ).closest('.container').removeClass('active');
        }, 1500 );
        $( beforeActioId ).removeClass('active');

        $( actionId ).addClass('active');
        $( actionId ).closest('.container').addClass('active');

      }


    });
  }


  function portfolioAnimationTextHeight() {
    $('.section').each(function() {

      var actionDiv   = $(this),
          actionId    = actionDiv.attr('data-heading'),
          height      = actionDiv.find('.inner-container').height();

      $( actionId ).css({
        'height': height
      })

    });
  }


  $(window).on('resize', function() {

    deviceControll();
    portfolioAnimationTextHeight();

  });



  $(window).on('load', function() {

    portfolioAnimationTextHeight();
    $('.home-section').addClass('active-animation');

  });



  $(document).on('ready', function() {


    deviceControll();
    fullpageInitialization( true );

    // var navigationClick = '#navbar-nav, #fp-nav';
    // $( navigationClick ).find('a').on('click', function() {
    //   $(this).closest( navigationClick ).find('.active').removeClass('active');
    //   $(this).addClass('active');
    // });

  });


} (jQuery) );


