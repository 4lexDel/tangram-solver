(()=>{"use strict";class e{cloneNDArray(e){return function e(t){return Array.isArray(t)?t.map(e):t}(e)}areArraysEqual(e,t){if(e.length!==t.length)return!1;for(let r=0;r<e.length;r++){if(e[r].length!==t[r].length)return!1;for(let l=0;l<e[r].length;l++)if(e[r][l]!==t[r][l])return!1}return!0}rotate2DArray(e){const t=e.length,r=e[0].length,l=[];for(let n=0;n<r;n++){const r=[];for(let l=0;l<t;l++)r.push(e[l][n]);l.push(r)}const s=[];for(let n=0;n<r;n++){const e=l[n].reverse();s.push(e)}return s}reverse2DArray(e){const t=e.length,r=e[0].length,l=[];for(let s=0;s<t;s++){const t=[];for(let l=r-1;l>=0;l--)t.push(e[s][l]);l.push(t)}return l}cropMatrix(e){let t=e[0].length,r=0,l=e.length,s=0;for(let i=0;i<e.length;i++)for(let n=0;n<e[i].length;n++)!1!==e[i][n]&&(t=Math.min(t,n),r=Math.max(r,n),l=Math.min(l,i),s=Math.max(s,i));let n=[];for(let i=l;i<=s;i++){let l=[];for(let s=t;s<=r;s++)l.push(e[i][s]);n.push(l)}return n}}class t{constructor(t){this.sharedService=new e,this.initialPattern=t,this.nbIteration=0}getAllPiecesCombinations(e){let t=e.map((e=>this.sharedService.cropMatrix(e.data)));console.log(t);let r=[];return t.forEach((e=>{let t=[];t.push(e),t.push(this.sharedService.reverse2DArray(e));let l=this.sharedService.cloneNDArray(e);for(let r=0;r<3;r++)l=this.sharedService.rotate2DArray(l),t.push(l),t.push(this.sharedService.reverse2DArray(l));r.push(this.removeDuplicateArrays(t))})),r}removeDuplicateArrays(e){const t=[];for(const r of e){let e=!1;for(const l of t)if(this.sharedService.areArraysEqual(r,l)){e=!0;break}e||t.push(r)}return t}parsePattern(e){for(let t=0;t<e.length;t++)for(let r=0;r<e[0].length;r++)-1!=e[t][r]&&(e[t][r]=0)}solve(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.nbIteration=0;let l=this.getAllPiecesCombinations(e);return l=l.sort((()=>Math.random()>.5?1:-1)),t?this.parsePattern(t):t=this.sharedService.cloneNDArray(this.initialPattern),t=this.process(t,l,1,r),t}process(e,t,r,l){if(this.nbIteration++,l&&(0==t.length?setTimeout((()=>{l(e)}),250):this.nbIteration%100==0&&l(e)),0==t.length)return e;const s=t[0];for(let n=0;n<s.length;n++){const i=s[n];for(let s=0;s<e.length;s++)for(let n=0;n<e[0].length;n++)if(this.isPiecePlacable(i,s,n,e)){let o=this.sharedService.cloneNDArray(e);if(this.placePiece(i,s,n,o,r),!this.isWrongAreaExist(o)){let e=this.sharedService.cloneNDArray(t);e.shift();let s=this.process(o,e,r+1,l);if(s)return s}}}return null}placePiece(e,t,r,l){let s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;for(let n=0;n<e.length;n++)for(let i=0;i<e[0].length;i++)e[n][i]&&0==l[t+n][r+i]&&(l[t+n][r+i]=s)}isPiecePlacable(e,t,r,l){if(t+e.length>=l.length||r+e[0].length>=l[0].length)return!1;for(let s=0;s<e.length;s++)for(let n=0;n<e[0].length;n++)if(e[s][n]&&0!=l[t+s][r+n])return!1;return!0}isWrongAreaExist(e){let t=this.sharedService.cloneNDArray(e),r=0;for(;;){if(r=this.countBlocksInNextAreaAvailable(t),-1==r)return!1;if(r%5!=0)return!0}}countBlocksInNextAreaAvailable(e){let t=this.getFirstBlockCoordAvailable(e);if(!t)return-1;let r={val:1};return e[t.x][t.y]=-1,this.countAreaBlocks(e,t,r),r.val}getFirstBlockCoordAvailable(e){for(let t=0;t<e.length;t++)for(let r=0;r<e[0].length;r++)if(0==e[t][r])return{x:t,y:r};return null}countAreaBlocks(e,t,r){let l=this.getNeighboorsAvailable(e,t);l.forEach((t=>{r.val++,e[t.x][t.y]=-1})),l.forEach((t=>{this.countAreaBlocks(e,t,r)}))}getNeighboorsAvailable(e,t){let r=[];return[[0,-1],[-1,0],[1,0],[0,1]].forEach((l=>{l[0]+=t.x,l[1]+=t.y,l[0]>=0&&l[0]<e.length&&l[1]>=0&&l[1]<e[0].length&&0==e[l[0]][l[1]]&&r.push({x:l[0],y:l[1]})})),r}}onmessage=e=>{const{pattern:r,pieceList:l}=e.data;new t(r).solve(l,r,(e=>{postMessage({result:e})}))}})();
//# sourceMappingURL=811.1de8cb0d.chunk.js.map