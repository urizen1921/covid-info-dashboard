export default async function fetchData(url) {

  let response = await fetch(url);

  if(!response && !response.ok) {
    throw new Error("network failure");
  }

  let data = await response.json();

  return data; 
}