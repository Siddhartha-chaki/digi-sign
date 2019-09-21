import React, { Component } from "react";
import { PDFDownloadLink, Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

export default class PDFViewer extends Component {
  state = { numPages: null, pageNumber: 1, hash: "" };

  onDocumentLoadSuccess = () => {
    //this.setState({ numPages });
    console.log(this);
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  render() {
    const { pageNumber, numPages } = this.state;
    console.log(this.props.filename);
    return (
      <div>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </nav>

        <div style={{ width: 600 }}>
          <Document
            file={this.props.filename}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>
        <p>
          Page {pageNumber} of {numPages}
        </p>
       
      </div>
    );
  }
}
