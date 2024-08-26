const apiRequest = async (url = "", optionsObj = null, errMsg = null) => {
  try {
    const response = await fetch(url, optionsObj);
    console.log(response);
    if (!response.ok) throw Error("please reload the app");
  } catch (err) {
    console.log(err.Message);
    errMsg = err.Message;
  } finally {
    return errMsg;
  }
};

export default apiRequest;
