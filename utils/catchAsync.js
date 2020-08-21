// whenever an error occurs the middlware catches it

// takes async function -- whenever an error occurs -- catches the error and runs next() to continue the process
// no longer need to type try and catch
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};