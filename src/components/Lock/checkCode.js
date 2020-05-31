const stringed = (arr) => JSON.stringify(arr) 

export const checkCode = (secret, answer = []) => {
  return stringed(answer) !== stringed(secret) ? false : true  
}



