import FileSaver from 'file-saver';

export function exportToCsv(data, pollName) {
  const chartDataStr = [
    Object.keys(data[0]).join(','),
    ...data.map(dataItem => Object.values(dataItem).join(',')),
  ].join('\n');

  const blob = new Blob([chartDataStr], { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(blob, 'poller export - ' + pollName + '.csv');
}
