import React from "react";
import axios from "axios";

class DownloadButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downloading: false,
    };
  }

  handleDownload = async () => {
    try {
      this.setState({ downloading: true });

      // Make a GET request to your Express storage API
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS_STORAGE}/storage/download/eeaaba50-f291-11ee-a467-e70e32699475calendario-2024-uai-final.pdf`,
        { responseType: "blob" }
      ); // Replace with your API endpoint
      console.log(response);
      const blob = new Blob([response.data], { type: response.data.type });

      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "filename.txt"; // Set the filename here
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      this.setState({ downloading: false });
    } catch (error) {
      console.error("Error downloading file:", error);
      this.setState({ downloading: false });
    }
  };

  render() {
    return (
      <div>
        <button disabled={this.state.downloading} onClick={this.handleDownload}>
          {this.state.downloading ? "Downloading..." : "Download File"}
        </button>
      </div>
    );
  }
}

export default DownloadButton;
