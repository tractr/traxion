export function mockNumFrame(cameraId: string = '1'): string {
  const date = new Date(Date.now());
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const frameId = Math.floor(Math.random() * 60).toString();

  return `${cameraId}${year}_${month}_${day}_${hours}_${minutes}_${seconds}_${frameId}`;
}
