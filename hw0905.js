let csvArray = [] // 配列を格納する変数

let number = "" // 入力から取得した7桁を格納する変数

function parseCSV(body) {

    // 改行ごとに配列化
    let lines = body.split(/\r\n|\n/);
    for (let i = 0; i < lines.length; ++i) {
        let cells = lines[i].split(",");
        csvArray.push(cells);
    }

    return csvArray;
}


/* 
CSVの配列２番目の郵便番号データと、取得した７桁の番号が同じなら、
７番目と８番目を表示する関数
↓ ここに問題がありそう。。
*/

function makeHTML(csvArray, zip) {
    let result = ""; // 結果を格納する変数
    
    function search(zip) {
        for (let index in csvArray) {
            let data = csvArray[index];
            if (data[2] === zip) {
                let address = data[7] + data[8];
                return address;
            }
        }
        return "";
    }
    
    result = search(number).value; // 住所を取得
    console.log(result)

    const element = document.getElementById('result');
    element.innerHTML = result;
}

// CSVファイルを読み込む
const f = document.getElementById('myfile');
f.addEventListener('change', evt => {
    const input = evt.target;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        // 読み出し結果の表示
        console.log(reader.result);
        csvArray = parseCSV(reader.result);  
    };
    reader.readAsText(file); // 読み込み開始
})

// フォームに入力されたテキストを変数に格納する
const f2 = document.getElementById("zip");
f2.addEventListener('input', evt => {
    const inputText = evt.target.value;
    if (inputText.length === 7) {
        number = inputText; // 7文字の場合、numberに格納
        console.log("numberに格納された郵便番号", number)
        makeHTML(csvArray, number); //makeHTMLを呼び出して結果を表示  
    }
});


