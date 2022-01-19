/**
 * @category Libs
 * @module zoomChart */
import dependencies from '../data/dependencies';

const webModal = dependencies.require('webModal');

export function maximize(id, opts) {
  let openmodal = webModal.open;
  let $el = $(id);
  opts = Object.assign(
    {
      afterLoad: null,
    },
    opts
  );
  let prevSize = { width: $el.css('width'), height: $el.css('height') };

  openmodal(id, {
    width: '80%',
    height: '70%',
    remove: false,
    parent: '.lt-vapp',
    beforeLoad: function () {
      $('.fancybox-inner').css('overflow-y', 'hidden');
      $el.css('width', 'inherit');
      $el.css('height', 'inherit');
    },
    afterLoad: function () {
      $('.fancybox-skin').addClass('gridster');
      $('.fancybox-inner').css('overflow-y', 'hidden');
      if (opts.afterLoad) opts.afterLoad();
    },
    afterClose: function () {
      $el.show();
      // $(document).unbind('click.fb-start');
      // $(document).unbind('click.fb');
      $el.css('width', prevSize.width);
      $el.css('height', prevSize.height);
    },
    afterShow: function () {
      $el.show();
      $('.fancybox-inner').css('overflow-y', 'hidden');
    },
  });

  if (opts.afterLoad) opts.afterLoad();

  $el.click();
}

/**
 * Open modal
 * @param {HTMLElement} el - Dom element for the widget graphics
 */
export function maximizeExperimental(id) {
  let $el = $(id);

  let leftMargin = 0;
  if ($('#main-navigation').length > 0) {
    leftMargin = $('#main-navigation').width();
  }

  let prevHeight = $el.css('height');

  $el.css({
    position: 'fixed',
    'z-index': 10,
    top: 0,
    left: leftMargin + 'px',
    bottom: 0,
    right: 0,
    'box-sizing': 'border-box',
    height: '100vh',
  });
  window.dispatchEvent(new Event('resize'));

  let $btnClose = $(`<div class="lt-vapp-zoom-close-btn">
    <div class="ns-close"></div>
  </div>`).css({
    position: 'fixed',
    'z-index': 100,
    width: 28,
    height: 28,
    'background-color': '#000',
    top: 0,
    right: 0,
  });
  $el.append($btnClose);

  $btnClose.on('click', () => {
    $el.css({
      position: 'block-inline',
      'z-index': 'auto',
      width: 'auto',
      height: prevHeight,
      top: '',
      left: '',
      bottom: '',
      right: '',
    });
    $btnClose.remove();
    window.dispatchEvent(new Event('resize'));
  });
}

export default {
  maximize,
  maximizeExperimental,
};
