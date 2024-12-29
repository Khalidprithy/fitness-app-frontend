'use client';

import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';

interface TextBox {
  id: string;
  text: string;
  color: string;
  fontFamily: string;
  textAlign: 'left' | 'center' | 'right';
}

export default function ImageTextEditor() {
  const [image, setImage] = useState<string | null>(null);
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([]);
  const [backdropBlur, setBackdropBlur] = useState('blur-sm');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBackDropBlurChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBackdropBlur(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setError(null);
      };
      reader.onerror = () => {
        setError('Failed to load the image. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const addNewTextBox = () => {
    const newTextBox: TextBox = {
      id: Date.now().toString(),
      text: 'New Text',
      color: '#000000',
      fontFamily: 'Arial',
      textAlign: 'left'
    };
    setTextBoxes([...textBoxes, newTextBox]);
  };

  const updateTextBox = (id: string, updates: Partial<TextBox>) => {
    setTextBoxes(
      textBoxes.map((tb) => (tb.id === id ? { ...tb, ...updates } : tb))
    );
  };

  const removeTextBox = (id: string) => {
    setTextBoxes(textBoxes.filter((tb) => tb.id !== id));
  };

  const updateCanvasText = () => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    canvas.remove(...canvas.getObjects('textbox'));

    textBoxes.forEach((tb, index) => {
      const textbox = new fabric.Textbox(tb.text, {
        left: 50,
        top: 50 + index * 30,
        fontSize: 20,
        fill: tb.color,
        fontFamily: tb.fontFamily,
        textAlign: tb.textAlign,
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
      });
      canvas.add(textbox);
    });

    canvas.renderAll();
  };

  const handleSave = () => {
    if (!fabricCanvasRef.current) return;

    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = fabricCanvasRef.current.toDataURL({ format: 'png' });
    link.click();
  };

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      fabricCanvasRef.current = canvas;

      fabric.Image.fromURL(
        image,
        (img) => {
          canvas.setDimensions({ width: img.width!, height: img.height! });
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        },
        undefined,
        // @ts-ignore
        { crossOrigin: 'anonymous' }
      );
    }
  }, [image]);

  useEffect(() => {
    updateCanvasText();
  }, [textBoxes, backdropBlur]);

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Upload Image
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {image && (
        <div className="overflow-hidden rounded border border-gray-300">
          <canvas ref={canvasRef} className="h-auto max-w-full" />
        </div>
      )}
      <div className="space-y-4">
        <button
          onClick={addNewTextBox}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Add New Text Box
        </button>
        {textBoxes.map((tb) => (
          <div key={tb.id} className="space-y-2 border-b pb-4">
            <div>
              <label className="block">
                Text:
                <input
                  type="text"
                  value={tb.text}
                  onChange={(e) =>
                    updateTextBox(tb.id, { text: e.target.value })
                  }
                  className="mt-1 block w-full rounded border p-1"
                />
              </label>
            </div>
            <div>
              <label className="block">
                Color:
                <input
                  type="color"
                  value={tb.color}
                  onChange={(e) =>
                    updateTextBox(tb.id, { color: e.target.value })
                  }
                  className="mt-1 block rounded border p-1"
                />
              </label>
            </div>
            <div>
              <label className="block">
                Font:
                <select
                  value={tb.fontFamily}
                  onChange={(e) =>
                    updateTextBox(tb.id, { fontFamily: e.target.value })
                  }
                  className="mt-1 block w-full rounded border p-1"
                >
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Georgia">Georgia</option>
                </select>
              </label>
            </div>
            <div>
              <label className="block">
                Alignment:
                <select
                  value={tb.textAlign}
                  onChange={(e) =>
                    updateTextBox(tb.id, {
                      textAlign: e.target.value as 'left' | 'center' | 'right'
                    })
                  }
                  className="mt-1 block w-full rounded border p-1"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </label>
            </div>
            <button
              onClick={() => removeTextBox(tb.id)}
              className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Remove
            </button>
          </div>
        ))}
        <div>
          <label className="block">
            Backdrop Blur:
            <select
              value={backdropBlur}
              onChange={handleBackDropBlurChange}
              className="mt-1 block w-full rounded border p-1"
            >
              <option value="blur-none">None</option>
              <option value="blur-sm">Small</option>
              <option value="blur-md">Medium</option>
              <option value="blur-lg">Large</option>
            </select>
          </label>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        disabled={!image}
      >
        Download Image with Text
      </button>
    </div>
  );
}

// 'use client';

// import { fabric } from 'fabric';
// import { useEffect, useRef, useState } from 'react';

// export default function ImageTextEditor() {
//   const [image, setImage] = useState<string | null>(null);
//   const [text, setText] = useState('');
//   const [textColor, setTextColor] = useState('#000000'); // Default color black
//   const [fontFamily, setFontFamily] = useState('Arial'); // Default font Arial
//   const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>(
//     'left'
//   ); // Default alignment

//   const [backdropBlur, setBackdropBlur] = useState('blur-sm');
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleBackDropBlurChange = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setBackdropBlur(e.target.value);
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImage(e.target?.result as string);
//         setError(null);
//       };
//       reader.onerror = () => {
//         setError('Failed to load the image. Please try again.');
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//   const updateCanvasText = () => {
//     if (!fabricCanvasRef.current) return;

//     const canvas = fabricCanvasRef.current;
//     const existingText = canvas
//       .getObjects()
//       .find((obj) => obj.type === 'textbox') as fabric.Textbox | undefined;

//     if (existingText) {
//       existingText.set({
//         text,
//         fill: textColor,
//         fontFamily,
//         textAlign,
//         backgroundColor: 'rgba(255, 255, 255, 0.7)' // Set a semi-transparent white background
//       });
//     } else {
//       const textbox = new fabric.Textbox(text, {
//         left: 50,
//         top: 50,
//         fontSize: 20,
//         fill: textColor,
//         fontFamily,
//         textAlign,
//         width: 300,
//         backgroundColor: 'rgba(255, 255, 255, 0.7)' // Set a semi-transparent white background
//       });
//       canvas.add(textbox);
//     }

//     canvas.renderAll();
//   };

//   const handleSave = () => {
//     if (!fabricCanvasRef.current) return;

//     const link = document.createElement('a');
//     link.download = 'edited-image.png';
//     link.href = fabricCanvasRef.current.toDataURL({ format: 'png' });
//     link.click();
//   };

//   useEffect(() => {
//     if (image && canvasRef.current) {
//       const canvas = new fabric.Canvas(canvasRef.current);
//       fabricCanvasRef.current = canvas;

//       fabric.Image.fromURL(
//         image,
//         (img) => {
//           canvas.setDimensions({ width: img.width!, height: img.height! });
//           canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
//         },
//         undefined,
//         { crossOrigin: 'anonymous' }
//       );
//     }
//   }, [image]);

//   useEffect(() => {
//     updateCanvasText();
//   }, [text, textColor, fontFamily, textAlign, backdropBlur]);

//   return (
//     <div className="space-y-4">
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageUpload}
//         ref={fileInputRef}
//         className="hidden"
//       />
//       <button
//         onClick={() => fileInputRef.current?.click()}
//         className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//       >
//         Upload Image
//       </button>
//       {error && <p className="text-red-500">{error}</p>}
//       {image && (
//         <div className="overflow-hidden rounded border border-gray-300">
//           <canvas ref={canvasRef} className="h-auto max-w-full" />
//         </div>
//       )}
//       <div className="space-y-4">
//         <div>
//           <label>
//             Enter Text:{' '}
//             <input
//               type="text"
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               className="rounded border p-1"
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Text Color:{' '}
//             <input
//               type="color"
//               value={textColor}
//               onChange={(e) => setTextColor(e.target.value)}
//               className="rounded border p-1"
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Backdrop Blur:{' '}
//             <select
//               value={backdropBlur}
//               onChange={handleBackDropBlurChange}
//               className="rounded border p-1"
//             >
//               <option value="blur-none">None</option>
//               <option value="blur-sm">Small</option>
//               <option value="blur-md">Medium</option>
//               <option value="blur-lg">Large</option>
//             </select>
//           </label>
//         </div>
//         <div>
//           <label>
//             Font:{' '}
//             <select
//               value={fontFamily}
//               onChange={(e) => setFontFamily(e.target.value)}
//               className="rounded border p-1"
//             >
//               <option value="Arial">Arial</option>
//               <option value="Times New Roman">Times New Roman</option>
//               <option value="Courier New">Courier New</option>
//               <option value="Verdana">Verdana</option>
//               <option value="Georgia">Georgia</option>
//             </select>
//           </label>
//         </div>
//         <div>
//           <label>
//             Text Alignment:{' '}
//             <select
//               value={textAlign}
//               onChange={(e) =>
//                 setTextAlign(e.target.value as 'left' | 'center' | 'right')
//               }
//               className="rounded border p-1"
//             >
//               <option value="left">Left</option>
//               <option value="center">Center</option>
//               <option value="right">Right</option>
//             </select>
//           </label>
//         </div>
//       </div>
//       <button
//         onClick={handleSave}
//         className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//         disabled={!image}
//       >
//         Download Image with Text
//       </button>
//     </div>
//   );
// }

// // 'use client';

// // import { fabric } from 'fabric';
// // import { useEffect, useRef, useState } from 'react';

// // export default function ImageTextEditor() {
// //   const [image, setImage] = useState<string | null>(null);
// //   const [text, setText] = useState('');
// //   const [textColor, setTextColor] = useState('#000000'); // Default color black
// //   const [fontFamily, setFontFamily] = useState('Arial'); // Default font Arial
// //   const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>(
// //     'left'
// //   ); // Default alignment
// //   const canvasRef = useRef<HTMLCanvasElement>(null);
// //   const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
// //   const fileInputRef = useRef<HTMLInputElement>(null);
// //   const [error, setError] = useState<string | null>(null);

// //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = (e) => {
// //         setImage(e.target?.result as string);
// //         setError(null);
// //       };
// //       reader.onerror = () => {
// //         setError('Failed to load the image. Please try again.');
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const updateCanvasText = () => {
// //     if (!fabricCanvasRef.current) return;

// //     const canvas = fabricCanvasRef.current;
// //     const existingText = canvas
// //       .getObjects()
// //       .find((obj) => obj.type === 'textbox') as fabric.Textbox | undefined;

// //     if (existingText) {
// //       existingText.set({
// //         text,
// //         fill: textColor,
// //         fontFamily,
// //         textAlign
// //       });
// //     } else {
// //       const textbox = new fabric.Textbox(text, {
// //         left: 50,
// //         top: 50,
// //         fontSize: 20,
// //         fill: textColor,
// //         fontFamily,
// //         textAlign,
// //         width: 300,
// //         backgroundColor: 'rgba(0,0,0,0.3)'
// //       });
// //       canvas.add(textbox);
// //     }

// //     canvas.renderAll();
// //   };

// //   const handleSave = () => {
// //     if (!fabricCanvasRef.current) return;

// //     const link = document.createElement('a');
// //     link.download = 'edited-image.png';
// //     link.href = fabricCanvasRef.current.toDataURL({ format: 'png' });
// //     link.click();
// //   };

// //   useEffect(() => {
// //     if (image && canvasRef.current) {
// //       const canvas = new fabric.Canvas(canvasRef.current);
// //       fabricCanvasRef.current = canvas;

// //       fabric.Image.fromURL(
// //         image,
// //         (img) => {
// //           canvas.setDimensions({ width: img.width!, height: img.height! });
// //           canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
// //         },
// //         undefined,
// //         { crossOrigin: 'anonymous' }
// //       );
// //     }
// //   }, [image]);

// //   useEffect(() => {
// //     updateCanvasText();
// //   }, [text, textColor, fontFamily, textAlign]);

// //   return (
// //     <div className="space-y-4">
// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={handleImageUpload}
// //         ref={fileInputRef}
// //         className="hidden"
// //       />
// //       <button
// //         onClick={() => fileInputRef.current?.click()}
// //         className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
// //       >
// //         Upload Image
// //       </button>
// //       {error && <p className="text-red-500">{error}</p>}
// //       {image && (
// //         <div className="overflow-hidden rounded border border-gray-300">
// //           <canvas ref={canvasRef} className="h-auto max-w-full" />
// //         </div>
// //       )}
// //       <div className="space-y-4">
// //         <div>
// //           <label>
// //             Enter Text:{' '}
// //             <input
// //               type="text"
// //               value={text}
// //               onChange={(e) => setText(e.target.value)}
// //               className="rounded border p-1"
// //             />
// //           </label>
// //         </div>
// //         <div>
// //           <label>
// //             Text Color:{' '}
// //             <input
// //               type="color"
// //               value={textColor}
// //               onChange={(e) => setTextColor(e.target.value)}
// //               className="rounded border p-1"
// //             />
// //           </label>
// //         </div>
// //         <div>
// //           <label>
// //             Font:{' '}
// //             <select
// //               value={fontFamily}
// //               onChange={(e) => setFontFamily(e.target.value)}
// //               className="rounded border p-1"
// //             >
// //               <option value="Arial">Arial</option>
// //               <option value="Times New Roman">Times New Roman</option>
// //               <option value="Courier New">Courier New</option>
// //               <option value="Verdana">Verdana</option>
// //               <option value="Georgia">Georgia</option>
// //             </select>
// //           </label>
// //         </div>
// //         <div>
// //           <label>
// //             Text Alignment:{' '}
// //             <select
// //               value={textAlign}
// //               onChange={(e) =>
// //                 setTextAlign(e.target.value as 'left' | 'center' | 'right')
// //               }
// //               className="rounded border p-1"
// //             >
// //               <option value="left">Left</option>
// //               <option value="center">Center</option>
// //               <option value="right">Right</option>
// //             </select>
// //           </label>
// //         </div>
// //       </div>
// //       <button
// //         onClick={handleSave}
// //         className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
// //         disabled={!image}
// //       >
// //         Download Image with Text
// //       </button>
// //     </div>
// //   );
// // }

// // 'use client';

// // import { fabric } from 'fabric';
// // import { useEffect, useRef, useState } from 'react';

// // import dynamic from 'next/dynamic';

// // // Dynamically import Jodit React
// // const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

// // export default function ImageTextEditor() {
// //   const [image, setImage] = useState<string | null>(null);
// //   const [htmlContent, setHtmlContent] = useState('');
// //   const canvasRef = useRef<HTMLCanvasElement>(null);
// //   const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
// //   const fileInputRef = useRef<HTMLInputElement>(null);
// //   const [error, setError] = useState<string | null>(null);

// //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = (e) => {
// //         setImage(e.target?.result as string);
// //         setError(null);
// //       };
// //       reader.onerror = () => {
// //         setError('Failed to load the image. Please try again.');
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleHtmlChange = (newHtml: string) => {
// //     setHtmlContent(newHtml);
// //     updateCanvasWithHtml(newHtml);
// //   };

// //   const updateCanvasWithHtml = (html: string) => {
// //     if (!fabricCanvasRef.current) return;

// //     const canvas = fabricCanvasRef.current;
// //     // Clear existing text objects
// //     canvas.getObjects().forEach((obj) => {
// //       if (obj.type === 'textbox') {
// //         canvas.remove(obj);
// //       }
// //     });

// //     const parser = new DOMParser();
// //     const doc = parser.parseFromString(html, 'text/html');
// //     const elements = Array.from(doc.body.childNodes);

// //     let currentTop = 50; // Starting vertical position for the text
// //     elements.forEach((el) => {
// //       if (el.nodeType === Node.ELEMENT_NODE) {
// //         const element = el as HTMLElement;
// //         const text = element.innerText || '';
// //         const style = window.getComputedStyle(element);

// //         const textbox = new fabric.Textbox(text, {
// //           left: 50,
// //           top: currentTop,
// //           fontSize: parseFloat(style.fontSize) || 20,
// //           fill: style.color || '#000',
// //           fontFamily: style.fontFamily || 'Arial',
// //           fontStyle: style.fontStyle || 'normal',
// //           fontWeight: style.fontWeight as 'normal' | 'bold',
// //           textAlign: style.textAlign as 'left' | 'center' | 'right' | 'justify',
// //           width: 400, // Max width for wrapping
// //           backgroundColor:
// //             style.backgroundColor !== 'rgba(0, 0, 0, 0)'
// //               ? style.backgroundColor
// //               : 'transparent'
// //         });

// //         canvas.add(textbox);
// //         currentTop += textbox.height || 30; // Adjust top for next element
// //       }
// //     });

// //     canvas.renderAll();
// //   };

// //   const handleSave = () => {
// //     if (!fabricCanvasRef.current) return;

// //     const link = document.createElement('a');
// //     link.download = 'edited-image.png';
// //     link.href = fabricCanvasRef.current.toDataURL({ format: 'png' });
// //     link.click();
// //   };

// //   useEffect(() => {
// //     if (image && canvasRef.current) {
// //       const canvas = new fabric.Canvas(canvasRef.current);
// //       fabricCanvasRef.current = canvas;

// //       fabric.Image.fromURL(
// //         image,
// //         (img) => {
// //           canvas.setDimensions({ width: img.width!, height: img.height! });
// //           canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
// //           updateCanvasWithHtml(htmlContent);
// //         },
// //         undefined,
// //         { crossOrigin: 'anonymous' }
// //       );
// //     }
// //   }, [image]);

// //   return (
// //     <div className="space-y-4">
// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={handleImageUpload}
// //         ref={fileInputRef}
// //         className="hidden"
// //       />
// //       <button
// //         onClick={() => fileInputRef.current?.click()}
// //         className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
// //       >
// //         Upload Image
// //       </button>
// //       {error && <p className="text-red-500">{error}</p>}
// //       {image && (
// //         <div className="overflow-hidden rounded border border-gray-300">
// //           <canvas ref={canvasRef} className="h-auto max-w-full" />
// //         </div>
// //       )}
// //       <div className="rounded border border-gray-300">
// //         <JoditEditor
// //           value={htmlContent}
// //           config={{
// //             readonly: false,
// //             height: 300,
// //             uploader: { insertImageAsBase64URI: true }
// //           }}
// //           onBlur={handleHtmlChange}
// //           onChange={handleHtmlChange}
// //         />
// //       </div>
// //       <button
// //         onClick={handleSave}
// //         className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
// //         disabled={!image}
// //       >
// //         Download Image with Text
// //       </button>
// //     </div>
// //   );
// // }

// // 'use client';

// // import { fabric } from 'fabric';
// // import { useEffect, useRef, useState } from 'react';

// // import dynamic from 'next/dynamic';

// // // Dynamically import Jodit React
// // const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

// // export default function ImageTextEditor() {
// //   const [image, setImage] = useState<string | null>(null);
// //   const [htmlContent, setHtmlContent] = useState('');
// //   const canvasRef = useRef<HTMLCanvasElement>(null);
// //   const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
// //   const fileInputRef = useRef<HTMLInputElement>(null);
// //   const [error, setError] = useState<string | null>(null);

// //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = (e) => {
// //         setImage(e.target?.result as string);
// //         setError(null);
// //       };
// //       reader.onerror = () => {
// //         setError('Failed to load the image. Please try again.');
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleHtmlChange = (newHtml: string) => {
// //     setHtmlContent(newHtml);
// //     updateCanvasWithHtml(newHtml);
// //   };

// //   const updateCanvasWithHtml = (html: string) => {
// //     if (!fabricCanvasRef.current) return;

// //     const canvas = fabricCanvasRef.current;
// //     // Clear existing text objects
// //     canvas.getObjects().forEach((obj) => {
// //       if (obj.type === 'textbox') {
// //         canvas.remove(obj);
// //       }
// //     });

// //     // Create a new textbox with rich text styles
// //     const parser = new DOMParser();
// //     const doc = parser.parseFromString(html, 'text/html');
// //     const elements = Array.from(doc.body.childNodes);

// //     let currentTop = 50; // Starting vertical position for the text
// //     elements.forEach((el) => {
// //       if (el.nodeType === Node.ELEMENT_NODE) {
// //         const element = el as HTMLElement;
// //         const text = element.innerText || '';
// //         const style = window.getComputedStyle(element);

// //         const textbox = new fabric.Textbox(text, {
// //           left: 50,
// //           top: currentTop,
// //           fontSize: parseFloat(style.fontSize) || 20,
// //           fill: style.color || '#000',
// //           fontFamily: style.fontFamily || 'Arial',
// //           width: 400,
// //           backgroundColor: style.backgroundColor || 'transparent',
// //           fontStyle: style.fontStyle,
// //           fontWeight: style.fontWeight as 'normal' | 'bold'
// //         });

// //         canvas.add(textbox);
// //         currentTop += textbox.height || 30; // Adjust top for next element
// //       }
// //     });

// //     canvas.renderAll();
// //   };

// //   const handleSave = () => {
// //     if (!fabricCanvasRef.current) return;

// //     const link = document.createElement('a');
// //     link.download = 'edited-image.png';
// //     link.href = fabricCanvasRef.current.toDataURL({ format: 'png' });
// //     link.click();
// //   };

// //   useEffect(() => {
// //     if (image && canvasRef.current) {
// //       const canvas = new fabric.Canvas(canvasRef.current);
// //       fabricCanvasRef.current = canvas;

// //       fabric.Image.fromURL(
// //         image,
// //         (img) => {
// //           canvas.setDimensions({ width: img.width!, height: img.height! });
// //           canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
// //           updateCanvasWithHtml(htmlContent);
// //         },
// //         undefined,
// //         { crossOrigin: 'anonymous' }
// //       );
// //     }
// //   }, [image]);

// //   return (
// //     <div className="space-y-4">
// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={handleImageUpload}
// //         ref={fileInputRef}
// //         className="hidden"
// //       />
// //       <button
// //         onClick={() => fileInputRef.current?.click()}
// //         className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
// //       >
// //         Upload Image
// //       </button>
// //       {error && <p className="text-red-500">{error}</p>}
// //       {image && (
// //         <div className="overflow-hidden rounded border border-gray-300">
// //           <canvas ref={canvasRef} className="h-auto max-w-full" />
// //         </div>
// //       )}
// //       <div className="rounded border border-gray-300">
// //         <JoditEditor
// //           value={htmlContent}
// //           config={{
// //             readonly: false,
// //             height: 300,
// //             uploader: { insertImageAsBase64URI: true }
// //           }}
// //           onBlur={handleHtmlChange}
// //           onChange={handleHtmlChange}
// //         />
// //       </div>
// //       <button
// //         onClick={handleSave}
// //         className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
// //         disabled={!image}
// //       >
// //         Download Image with Text
// //       </button>
// //     </div>
// //   );
// // }

// // 'use client';

// // import { stripHtml } from '@/lib/utils';
// // import { fabric } from 'fabric';
// // import { useEffect, useRef, useState } from 'react';

// // import dynamic from 'next/dynamic';

// // // Dynamically import Jodit React
// // const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

// // export default function ImageTextEditor() {
// //   const [image, setImage] = useState<string | null>(null);
// //   const [text, setText] = useState('');
// //   const [textColor, setTextColor] = useState('#ffffff'); // Default color white
// //   const [fontFamily, setFontFamily] = useState('Arial'); // Default font Arial
// //   const canvasRef = useRef<HTMLCanvasElement>(null);
// //   const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
// //   const fileInputRef = useRef<HTMLInputElement>(null);
// //   const [error, setError] = useState<string | null>(null);

// //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = (e) => {
// //         setImage(e.target?.result as string);
// //         setError(null);
// //       };
// //       reader.onerror = () => {
// //         setError('Failed to load the image. Please try again.');
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleTextChange = (newText: string) => {
// //     setText(newText);
// //     updateCanvasText(stripHtml(newText));
// //   };

// //   const handleTextColorChange = (color: string) => {
// //     setTextColor(color);
// //     updateCanvasText(stripHtml(text), color, fontFamily);
// //   };

// //   const handleFontChange = (font: string) => {
// //     setFontFamily(font);
// //     updateCanvasText(stripHtml(text), textColor, font);
// //   };

// //   const updateCanvasText = (
// //     newText: string,
// //     color: string = textColor,
// //     font: string = fontFamily
// //   ) => {
// //     if (!fabricCanvasRef.current) return;

// //     const canvas = fabricCanvasRef.current;
// //     const existingText = canvas
// //       .getObjects()
// //       .find((obj) => obj.type === 'textbox') as fabric.Textbox | undefined;

// //     if (existingText) {
// //       existingText.set({
// //         text: newText,
// //         fill: color,
// //         fontFamily: font
// //       });
// //     } else {
// //       const textbox = new fabric.Textbox(newText, {
// //         left: 50,
// //         top: 50,
// //         fontSize: 20,
// //         fill: color,
// //         fontFamily: font,
// //         width: 200,
// //         backgroundColor: 'rgba(0,0,0,0.3)'
// //       });
// //       canvas.add(textbox);
// //     }

// //     canvas.renderAll();
// //   };

// //   const handleSave = () => {
// //     if (!fabricCanvasRef.current) return;

// //     const link = document.createElement('a');
// //     link.download = 'edited-image.png';
// //     link.href = fabricCanvasRef.current.toDataURL({ format: 'png' });
// //     link.click();
// //   };

// //   useEffect(() => {
// //     if (image && canvasRef.current) {
// //       const canvas = new fabric.Canvas(canvasRef.current);
// //       fabricCanvasRef.current = canvas;

// //       fabric.Image.fromURL(
// //         image,
// //         (img) => {
// //           canvas.setDimensions({ width: img.width!, height: img.height! });
// //           canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
// //           updateCanvasText(stripHtml(text));
// //         },
// //         undefined,
// //         { crossOrigin: 'anonymous' }
// //       );
// //     }
// //   }, [image]);

// //   return (
// //     <div className="space-y-4">
// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={handleImageUpload}
// //         ref={fileInputRef}
// //         className="hidden"
// //       />
// //       <button
// //         onClick={() => fileInputRef.current?.click()}
// //         className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
// //       >
// //         Upload Image
// //       </button>
// //       {error && <p className="text-red-500">{error}</p>}
// //       {image && (
// //         <div className="overflow-hidden rounded border border-gray-300">
// //           <canvas ref={canvasRef} className="h-auto max-w-full" />
// //         </div>
// //       )}
// //       <div className="space-y-2">
// //         <label>
// //           Text Color:{' '}
// //           <input
// //             type="color"
// //             value={textColor}
// //             onChange={(e) => handleTextColorChange(e.target.value)}
// //           />
// //         </label>
// //         <label>
// //           Font:{' '}
// //           <select
// //             value={fontFamily}
// //             onChange={(e) => handleFontChange(e.target.value)}
// //           >
// //             <option value="Arial">Arial</option>
// //             <option value="Times New Roman">Times New Roman</option>
// //             <option value="Courier New">Courier New</option>
// //             <option value="Verdana">Verdana</option>
// //             <option value="Georgia">Georgia</option>
// //           </select>
// //         </label>
// //       </div>
// //       <div className="rounded border border-gray-300">
// //         <JoditEditor
// //           value={text}
// //           config={{
// //             readonly: false,
// //             height: 300,
// //             uploader: { insertImageAsBase64URI: true },
// //             removeButtons: ['image']
// //           }}
// //           onBlur={handleTextChange}
// //           onChange={handleTextChange}
// //         />
// //       </div>
// //       <button
// //         onClick={handleSave}
// //         className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
// //         disabled={!image}
// //       >
// //         Download Image with Text
// //       </button>
// //     </div>
// //   );
// // }

// // 'use client';

// // import { stripHtml } from '@/lib/utils';
// // import { fabric } from 'fabric';
// // import { useEffect, useRef, useState } from 'react';

// // import dynamic from 'next/dynamic';

// // // Dynamically import Jodit React
// // const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

// // export default function ImageTextEditor() {
// //   const [image, setImage] = useState<string | null>(null);
// //   const [text, setText] = useState('');
// //   const canvasRef = useRef<HTMLCanvasElement>(null);
// //   const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
// //   const fileInputRef = useRef<HTMLInputElement>(null);
// //   const [error, setError] = useState<string | null>(null);

// //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = (e) => {
// //         setImage(e.target?.result as string);
// //         setError(null);
// //       };
// //       reader.onerror = () => {
// //         setError('Failed to load the image. Please try again.');
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleTextChange = (newText: string) => {
// //     setText(newText);
// //     updateCanvasText(stripHtml(newText));
// //   };

// //   const updateCanvasText = (newText: string) => {
// //     if (!fabricCanvasRef.current) return;

// //     const canvas = fabricCanvasRef.current;
// //     const existingText = canvas
// //       .getObjects()
// //       .find((obj) => obj.type === 'textbox') as fabric.Textbox | undefined;

// //     if (existingText) {
// //       existingText.set('text', newText);
// //     } else {
// //       const textbox = new fabric.Textbox(newText, {
// //         left: 50,
// //         top: 50,
// //         fontSize: 20,
// //         fill: 'white',
// //         width: 200,
// //         backgroundColor: 'rgba(0,0,0,0.3)'
// //       });
// //       canvas.add(textbox);
// //     }

// //     canvas.renderAll();
// //   };

// //   const handleSave = () => {
// //     if (!fabricCanvasRef.current) return;

// //     const link = document.createElement('a');
// //     link.download = 'edited-image.png';
// //     link.href = fabricCanvasRef.current.toDataURL({ format: 'png' });
// //     link.click();
// //   };

// //   useEffect(() => {
// //     if (image && canvasRef.current) {
// //       const canvas = new fabric.Canvas(canvasRef.current);
// //       fabricCanvasRef.current = canvas;

// //       fabric.Image.fromURL(
// //         image,
// //         (img) => {
// //           canvas.setDimensions({ width: img.width!, height: img.height! });
// //           canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
// //           updateCanvasText(stripHtml(text));
// //         },
// //         undefined,
// //         { crossOrigin: 'anonymous' }
// //       );
// //     }
// //   }, [image]);

// //   return (
// //     <div className="space-y-4">
// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={handleImageUpload}
// //         ref={fileInputRef}
// //         className="hidden"
// //       />
// //       <button
// //         onClick={() => fileInputRef.current?.click()}
// //         className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
// //       >
// //         Upload Image
// //       </button>
// //       {error && <p className="text-red-500">{error}</p>}
// //       {image && (
// //         <div className="overflow-hidden rounded border border-gray-300">
// //           <canvas ref={canvasRef} className="h-auto max-w-full" />
// //         </div>
// //       )}
// //       <div className="rounded border border-gray-300">
// //         <JoditEditor
// //           value={text}
// //           config={{
// //             readonly: false,
// //             height: 300,
// //             uploader: { insertImageAsBase64URI: true },
// //             removeButtons: ['image']
// //           }}
// //           onBlur={handleTextChange}
// //           onChange={handleTextChange}
// //         />
// //       </div>
// //       <button
// //         onClick={handleSave}
// //         className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
// //         disabled={!image}
// //       >
// //         Download Image with Text
// //       </button>
// //     </div>
// //   );
// // }
