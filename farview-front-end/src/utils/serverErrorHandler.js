const handleServerError = (error, thunkAPI) => {
  if (error.response) {
    const status = error.response.status;
    const message =
      error.response.data.message ||
      'Ha ocurrido un error inesperado, intente más tarde...';
    const statusText = error.response.statusText || '500';
    const requestError = {
      status,
      message,
      statusText,
    };
    if (thunkAPI) {
      return thunkAPI.rejectWithValue(requestError);
    }
    return requestError;
  } else if (error.request) {
    const requestError = {
      status: 503,
      message: 'El servicio no está disponible, intente más tarde',
      statusText: 'SERVICE UNAVAILABLE',
    };
    if (thunkAPI) {
      return thunkAPI.rejectWithValue(requestError);
    }
    return requestError;
  }
};

export default handleServerError;
