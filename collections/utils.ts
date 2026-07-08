
/** Utility Function to get filenames without the extension. If the  titleFragments array is longer than two (i.e the file has more than one dot in its name) it cocantenates every element except the last one and returns the cocantenated string */
export function createTitle(filename:string): string {
  const titleFragments = filename.split('.');
  if(titleFragments.length > 2){
    titleFragments.pop();
    return titleFragments.reduce((a,b) => b + a, "");
  }else{
    return titleFragments[0];
  }
}
