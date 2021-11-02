import React from 'react';
import { Bar } from 'react-chartjs-2';
import { getDefaultRandomList } from './generateRandomDefault';
import { getSquareRandomList } from './generateSquareRandomList';
import { getCongruentRandomList } from './generateCongruentList';
import ReactExport from "react-export-excel";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export const Charts = ({ props }) => {

    const maxNumberRange = props[0];
    const intervalsCount = props[1];
    const tryCount = props[2];

    const defaultRandom = getDefaultRandomList(maxNumberRange, tryCount);
    const squareRandom = getSquareRandomList(maxNumberRange, tryCount);
    const congruentRandom = getCongruentRandomList(maxNumberRange, tryCount);

    const dataDefRnd = getHits(maxNumberRange, defaultRandom, getLabels(intervalsCount));
    const dataSqRnd = getHits(maxNumberRange, squareRandom, getLabels(intervalsCount));
    const dataConRnd = getHits(maxNumberRange, congruentRandom, getLabels(intervalsCount));

    const defaultRandomChart = {
        labels: getLabels(intervalsCount),
        datasets: [
            {
                label: 'Default Random',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: dataDefRnd
            }
        ]
    }

    const squareRandomChart = {
        labels: getLabels(intervalsCount),
        datasets: [
            {
                label: 'Square Random',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: dataSqRnd
            }
        ]
    }

    const conChart = {
        labels: getLabels(intervalsCount),
        datasets: [
            {
                label: 'Congruent Random',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: dataConRnd
            }
        ]
    }

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }


    return (

        <div>
            <div>
                <Bar
                    data={defaultRandomChart}
                    options={{
                        title: {
                            display: true,
                            text: '',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
            <div>
                <Bar
                    data={squareRandomChart}
                    options={{
                        title: {
                            display: true,
                            text: '',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
            <div>
                <Bar
                    data={conChart}
                    options={{
                        title: {
                            display: true,
                            text: '',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
            <div onClick={exportToCSV([defaultRandomChart, squareRandomChart, conChart], 'test_charts')}>
                <Button variant="outlined" color="primary">
                    export to exel
                </Button>
            </div>
        </div>

    );

}

const getLabels = (num) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr[i] = i + 1;
    }
    return arr;
}

const getHits = (max, values, arr) => {
    let output = [];

    for (let i = 0; i < arr.length; i++) {
        output[i] = [];
        for (let j = 0; j < values.length; j++) {
            if (max / arr.length * (i) < values[j] && max / arr.length * (i + 1) >= values[j]) {
                output[i].push(values[j]);
            }
        }
    }

    console.log(output);
    let counts = [];
    for (let i = 0; i < arr.length; i++) {
        counts[i] = output[i].length;
    }
    console.log(counts);

    return counts;
}

