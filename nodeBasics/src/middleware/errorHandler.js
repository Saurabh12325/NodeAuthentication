 const errorHandler = (err,req,res,next) => {
      console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ errors });
  }
  if (err.code && err.code === 11000) {

    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ errors: [`${field} already exists`] });
  }
  res.status(status).json({ message });
};
export default errorHandler;