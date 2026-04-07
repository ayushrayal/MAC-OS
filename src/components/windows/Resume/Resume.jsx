import React, { useState } from 'react';
import MacWindows from '../MacWindows';
import { Document, Page, pdfjs } from 'react-pdf';
import { Download, ZoomIn, ZoomOut } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './resume.scss';

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Resume = ({ windowName }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const handleZoomIn = () => setScale(s => Math.min(s + 0.2, 2.0));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.2, 0.6));

  return (
    <MacWindows windowName={windowName}>
      <div className="resume-container">
        <div className="resume-toolbar">
          <div className="zoom-controls">
            <button onClick={handleZoomOut}><ZoomOut size={16} /></button>
            <span>{Math.round(scale * 100)}%</span>
            <button onClick={handleZoomIn}><ZoomIn size={16} /></button>
          </div>
          <a href="/AyushRayal.pdf" download className="download-btn">
            <Download size={16} /> Download
          </a>
        </div>

        <div className="pdf-wrapper">
          {isLoading && (
            <div className="skeleton-loader">
              <div className="skeleton-page"></div>
            </div>
          )}
          <Document
            file="/AyushRayal.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={null}
            error={
              <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
                Failed to load PDF. Please make sure AyushRayal.pdf is in the public folder.
              </div>
            }
          >
            <Page pageNumber={pageNumber} scale={scale} renderTextLayer={false} renderAnnotationLayer={false} />
          </Document>
        </div>
      </div>
    </MacWindows>
  );
};

export default Resume;
