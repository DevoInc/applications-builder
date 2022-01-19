import * as alerts from './alerts';
import html2canvas from 'html2canvas';

/**
 * @category Libs
 * @class ScreenshotLib
 *
 * object necesary to take one app full screenshot
 */

export class ScreenShot {
  constructor(settings = {}) {
    this.settings = Object.assign(
      {
        callback: null,
        method: 'w', // 'w'|'d' - New Window or Download
        name: 'LtScreenShot',
        target: $('body')[0],
        excluded: [],
        flash: true,
        debug: false,
      },
      settings
    );
    this.DOMURL = window.URL || window.webkitURL || window;
  }

  /**
   * Take the screenshot
   *
   * @returns undefined
   */
  take() {
    if (this.settings.flash) {
      this.flash().then(() => {
        this.createImage();
      });
    } else {
      this.createImage();
    }
    this.beforeScreenshot();
  }

  /**
   * Open a new window with the image
   *
   * @param {String} dataUrl Image data
   * @returns undefined
   */
  toNewWindow(dataUrl) {
    let image = new Image();
    image.src = dataUrl;
    let openWindow = window.open(`${this.name}`);
    if (openWindow) {
      openWindow.document.open('text/html', 'replace');
      openWindow.document.write(image.outerHTML);
      openWindow.document.close();
    } else {
      alerts
        .error(
          `Couldn't create a new window, check your pop-ups
      blocking preferences.`
        )
        .replace(/\n/gm, '');
    }
  }

  /**
   * Create a link and download the image
   * @param {String} dataUrl Image data
   */
  toDownload(dataUrl) {
    let anchor = document.createElement('a');
    anchor.href = dataUrl;
    anchor.download = `${this.name}.png`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  /**
   * Before screenshot
   */
  beforeScreenshot() {
    // Hide all elements
    for (let elem of this.settings.excluded) $(elem).hide();
  }

  /**
   * After screenshot
   */
  afterScreenshot() {
    // Show all elements excluded before
    for (let elem of this.settings.excluded) $(elem).show();
    // Callback for after render
    if (this.settings.callback) this.settings.callback();
  }

  /**
   * Create the image
   */
  createImage() {
    html2canvas(this.settings.target, {
      async: true,
      logging: this.settings.debug,
      useCORS: true,
      allowTaint: false,
      scale: 1,
      onclone(document) {
        if (window.chrome) {
          var transform = $(document)
            .find('.gm-style>div:first>div')
            .css('transform');
          if (transform) {
            // var comp=transform.split(","); //split up the transform matrix
            // var mapright=parseFloat(comp[3]);
            // var mapleft=parseFloat(comp[4]); //get left value
            // var maptop=parseFloat(comp[5]);  //get top value
            // var mapbottom=parseFloat(comp[6]);
            $(document).find('.gm-style>div:first>div:first>div:last>div').css({
              //get the map container. not sure if stable
              transform: transform,
              top: 0,
              left: 0,
            });
          }
        }
      },
    })
      .then((canvas) => {
        const dataUrl = canvas.toDataURL();
        if (this.settings.method === 'w') {
          // If mode is new window
          this.toNewWindow(dataUrl);
        } else if (this.settings.method === 'd') {
          // If mode is download
          this.toDownload(dataUrl);
        }
        this.afterScreenshot();
      })
      .catch((err) => {
        console.error(`Error with screenshot module on toPng function.`);
        // console.error(err);
        this.afterScreenshot();
      });
  }

  /**
   * Do flash effect
   */
  flash() {
    const $el = $(this.settings.target);
    let lt_vapp = document.getElementsByClassName('lt-vapp')[0];

    let overlay = document.createElement('div');
    lt_vapp.appendChild(overlay);
    overlay.classList.add('lt-vapp-flashing');
    $(overlay).css({
      top: $el.position().top,
      left: $el.position().left,
      width: $el.width(),
      height: $el.height(),
    });

    if ($el.hasClass('lt-vapp')) {
      $(overlay).css({
        left: $el.position().left - $('#main-navigation').width(),
      });
    }

    return new Promise(function (resolve) {
      $(overlay).fadeOut(600, () => {
        overlay.parentNode.removeChild(overlay);
        resolve();
      });
    });
  }
}

/**
 * Take Widget ScreenShot
 *
 * @category Libs
 * @function takeElementScreenShot
 *
 * @param {object} el - Dom element for the screenshot
 * @param {string} color - Property for widget background before capture
 */
export function takeElementScreenShot(el, callback = null, options = {}) {
  options = Object.assign(
    {
      delay: 0,
    },
    options
  );
  setTimeout(() => {
    let excluded = [$('.lt-vapp-config')[0]];
    new ScreenShot({
      target: el,
      excluded: excluded,
      callback: callback,
    }).take();
  }, options.delay);
}

export default {
  takeElementScreenShot,
};
