// Worker

import { Solver } from "./Solver";

onmessage = (event) => {
  const { pattern, pieceList } = event.data;

  // console.log("PATTERN");
  // console.log(pattern);

  // console.log("PIECE LIST");
  // console.log(pieceList);

  let callback = (pattern, status=false) => {
    postMessage({result: pattern, status: status});
  };

  let solver = new Solver(pattern);

  let result = solver.solve(pieceList, pattern, callback);

  if(!result) postMessage({result: null, status: true});

  // setTimeout(() => {
  //   postMessage({result: result});
  // }, 500);
};