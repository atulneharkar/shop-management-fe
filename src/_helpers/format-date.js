export function setInputDate(date) {
	let d = new Date(date);
  let month = ((d.getMonth()+1) < 10) ? ("0"+(d.getMonth()+1)) : (d.getMonth()+1);
  let day = (d.getDate() < 10) ? ("0"+d.getDate()) : d.getDate();
  return d.getFullYear() + "-" + month + "-" + day;
}