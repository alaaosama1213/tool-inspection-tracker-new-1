import { Tool } from '../lib/supabase';
import { X, Printer, Download } from 'lucide-react';
import { useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeDisplayProps {
  tool: Tool;
  onClose: () => void;
}

export default function BarcodeDisplay({ tool, onClose }: BarcodeDisplayProps) {
  const barcodeRef = useRef<HTMLDivElement>(null);
  const barcodeSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (barcodeSvgRef.current) {
      try {
        JsBarcode(barcodeSvgRef.current, tool.barcode, {
          format: 'CODE128',
          width: 2,
          height: 80,
          displayValue: true,
          fontSize: 16,
          margin: 10,
          background: '#ffffff',
          lineColor: '#000000',
        });
      } catch (error) {
        console.error('Error generating barcode:', error);
      }
    }
  }, [tool.barcode]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (barcodeRef.current && barcodeSvgRef.current) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = 800;
      canvas.height = 500;

      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText('TOOL INSPECTION', canvas.width / 2, 40);

        ctx.font = 'bold 24px sans-serif';
        ctx.fillStyle = '#000';
        ctx.fillText(tool.name, canvas.width / 2, 75);

        const svgData = new XMLSerializer().serializeToString(barcodeSvgRef.current);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const img = new Image();

        img.onload = () => {
          ctx.drawImage(img, (canvas.width - img.width) / 2, 110);

          ctx.font = '14px sans-serif';
          ctx.fillStyle = '#666';
          ctx.fillText(`Category: ${tool.category}`, canvas.width / 2, 280);
          if (tool.serial_number) {
            ctx.fillText(`S/N: ${tool.serial_number}`, canvas.width / 2, 310);
          }

          ctx.font = '12px sans-serif';
          ctx.fillStyle = '#999';
          ctx.fillText('Scan this barcode to verify tool', canvas.width / 2, 350);

          const link = document.createElement('a');
          link.download = `barcode-${tool.barcode}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();

          URL.revokeObjectURL(svgUrl);
        };

        img.src = svgUrl;
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Barcode Label</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8">
            <div
              ref={barcodeRef}
              className="bg-white border-4 border-gray-800 rounded-lg p-8 text-center print:border-2"
            >
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-600 mb-2">TOOL INSPECTION</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{tool.name}</h3>
              </div>

              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-4 flex justify-center">
                <svg ref={barcodeSvgRef}></svg>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                <p>Category: {tool.category}</p>
                {tool.serial_number && <p>S/N: {tool.serial_number}</p>}
                <p className="text-xs text-gray-500 mt-2">
                  Scan this barcode to verify tool
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleDownload}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-5 h-5" />
                Print Label
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:border-2,
          .print\\:border-2 * {
            visibility: visible;
          }
          .print\\:border-2 {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            page-break-after: avoid;
          }
        }
      `}</style>
    </>
  );
}
