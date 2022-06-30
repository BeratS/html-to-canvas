interface IProps {
  refId: string;
  printStyle: string;
  opts: IOpts,
  cb: ICb;
}

interface IOpts {
  downloadAsImage?: boolean;
  name?: string;
}

interface ICbData {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}
type ICb = ({ ctx, width, height}: ICbData) => void

function onDownload(canvas: HTMLCanvasElement, name: string): void {
  const a: HTMLAnchorElement = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  a.href = canvas.toDataURL();
  a.download = name;
  a.click();
  document.body.removeChild(a);
}

/**
 * Convert html dom element to canvas
 * @param refId => id of div element in your html ex: <div id="toCanvas"></div>
 * @param printStyle => embed the style inside the canvas | svg
 * @param options => there some options, you may want to download it, set a name of the file.
 * @param cb => callback result
 */
export function htmlToCanvas({refId, printStyle, opts, cb}: IProps) {
  try {
    const content = document.getElementById(refId);

    // ------------------------------------------------------------------------
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = 424;
    canvas.height = 750;
  
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    canvas.style.background = 'white';
  
    const img = document.createElement('img');
    img.id = "print-ticket-img";
    img.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="424" height="750"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="padding-top:20px;">${
      printStyle
    }${
      content.outerHTML
    }</div></foreignObject></svg>`);
  
    content.appendChild(img);
    content.appendChild(canvas);
  
    const DOM_img = (document.getElementById('print-ticket-img') as HTMLImageElement);
    
    DOM_img.onload = (event: any) => {
      URL.revokeObjectURL(event?.target?.src || event.path[0].currentSrc) // 👈 This is important. If you are not using the blob, you should release it if you don't want to reuse it. It's good for memory.
      ctx.drawImage(event?.target || event.path[0], 0, 0);
  
      // Publish bmp array
      cb({ctx, width: canvas.width, height: canvas.height});

      if (opts.downloadAsImage) {
        onDownload(canvas, opts.name || 'download.png');
      }
    }
  } catch (e) {
    console.error(`ERROR: Unable to generate html to canvas ${e}`);
  }
}
