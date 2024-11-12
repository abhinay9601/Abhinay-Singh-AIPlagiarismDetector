
export interface PlagiarismCheckResult {
  result: {
    plagiarismData: string;
  },
  scanInformation: {
    inputType: string;
    scanTime: Date;
    service: string;
  },
  status?: number

}

class PlagiarismService {
  private API =
  import.meta.env.VITE_REACT_APP_API_URL || import.meta.env.VITE_REACT_APP_API_URL_UPDATED;

  
  public dummyPlagiarismData: PlagiarismCheckResult = {
    status: 404,
    scanInformation: {
      service: "plagiarism",
      scanTime: new Date("2024-11-12T10:26:49.787Z"),
      inputType: "text"
    },
    result: {
      plagiarismData: "Service is down. Please Try later. \n"
    }
  }

  async submitDocument(file: File): Promise<PlagiarismCheckResult> {

    const plagiarismResult = await this.checkPlagiarismWithGemini(file);

    return plagiarismResult;
  }


  private async checkPlagiarismWithGemini(
    file: any
  ): Promise<PlagiarismCheckResult> {
    let formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    const apiEndpoint = `${this.API}/api/gemini-plagiarism`;
    console.log(apiEndpoint)
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      return result.data as PlagiarismCheckResult;
    }
    catch (e) {
      console.log(e)
      this.dummyPlagiarismData.scanInformation.scanTime = new Date();
      return this.dummyPlagiarismData;
    }
  }
}

export default new PlagiarismService();
