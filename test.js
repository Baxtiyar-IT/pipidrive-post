const fs = require('fs');
const path = require('path');

const API_TOKEN = "d45d018ccd3a8ddfbe26bba1ea28474c6590d063";
const API_URL = "https://baxa.pipedrive.com/api/v2/deals";

async function createDeal() {
    const body = {
        title: "NEW TEST",
        value: 1000,
        currency: "USD",
        pipeline_id: 1,
        stage_id: 1,
        status: "open"
    };

    try {
        const res = await fetch(`${API_URL}?api_token=${API_TOKEN}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (res.status === 200) {
            // тут нужно добавить логику по типу сохранения в Excel, БД и тд.
            // но я просто сохранил в той же папке в виде JSON файла
            const filePath = path.join(__dirname, 'output.json');
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        } else {
            console.error(`Ошибка API: Статус ${res.status}, ответ:`, data);
        }
    } catch (err) {
        console.error("Ошибка при выполнении запроса:", err.message);
    }
}

createDeal();
