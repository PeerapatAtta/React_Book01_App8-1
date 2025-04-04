import React from 'react' // import ไลบรารี React เข้ามาใช้งาน

// ประกาศฟังก์ชันคอมโพเนนต์ชื่อ RestBasic และ export เป็น default เพื่อให้ component นี้สามารถนำไปใช้ที่อื่นได้
export default function RestBasic() {

    // สร้างตัวแปร state โดยใช้ useState hook เพื่อเก็บค่าเวลาจาก server และผลการแข่งขันฟุตบอล
    let [serverTime, setServerTime] = React.useState('') // สร้างตัวแปร serverTime และฟังก์ชัน setServerTime เพื่ออัปเดตค่าเวลาจาก server
    let [footballResult, setFootballResult] = React.useState('') // สร้างตัวแปร footballResult และฟังก์ชัน setFootballResult เพื่ออัปเดตค่าผลการแข่งขันฟุตบอล 

    const onClickShowTime = () => { // ฟังก์ชันที่ทำงานเมื่อคลิกปุ่ม "แสดงเวลาจาก Server"
        fetch('/api/server-time') // ส่งคำขอ GET ไปยัง API ที่กำหนด
            .then(response => response.json()) // แปลงข้อมูลที่ได้รับจาก server เป็น JSON
            .then(result => { // เมื่อได้รับข้อมูลจาก server
                let r = <>{result.hour}:{result.minute}:{result.second}</> // สร้าง JSX element ที่แสดงเวลาจาก server
                setServerTime(r) // อัปเดตค่า serverTime ด้วยเวลาที่ได้รับจาก server
            })
            .catch(err => alert(err)) // ถ้ามีข้อผิดพลาดเกิดขึ้น ให้แสดงข้อความเตือน
    }

    const onClickFootballResult = () => { // ฟังก์ชันที่ทำงานเมื่อคลิกปุ่ม "แสดงผลการแข่งขัน"
        fetch('/api/football-result') // ส่งคำขอ GET ไปยัง API ที่กำหนด
            .then(response => response.text()) // แปลงข้อมูลที่ได้รับจาก server เป็นข้อความ
            .then(result => { // เมื่อได้รับข้อมูลจาก server
                setFootballResult(result) // อัปเดตค่า footballResult ด้วยผลการแข่งขันฟุตบอลที่ได้รับจาก server
            })
            .catch(err => alert(err)) // ถ้ามีข้อผิดพลาดเกิดขึ้น ให้แสดงข้อความเตือน
    }

    // ฟังก์ชันนี้จะทำงานเมื่อคอมโพเนนต์ถูกเรนเดอร์ หรืออัปเดต JSX สำหรับแสดงผล
    return (
        <>
            <h1 className="border p-3 m-3 w-50 mx-auto text-center">App8.1 : React-Node</h1>
            <div className="border p-3 mb-3 w-50 mx-auto text-center">
                <h3>Display on Local from server data</h3><br></br>
                <button onClick={onClickShowTime}>แสดงเวลาจาก Server</button>  {/* ปุ่มที่เมื่อคลิกจะเรียกใช้ฟังก์ชัน onClickShowTime */}
                <div>{serverTime}</div>
                <br />

                <button onClick={onClickFootballResult}>แสดงผลการแข่งขัน</button><br /> {/* ปุ่มที่เมื่อคลิกจะเรียกใช้ฟังก์ชัน onClickFootballResult */}
                <div dangerouslySetInnerHTML={{ __html: footballResult }}></div> {/* แสดงผลการแข่งขันฟุตบอล โดยใช้ dangerouslySetInnerHTML เพื่อให้สามารถแสดง HTML ที่ได้รับจาก server */}
            </div>
        </>

    )
}