const swapFromTo = (From, To) => {
  const temp = From;
  From = To;
  To = temp;

  return { From, To };
};

export default swapFromTo;
