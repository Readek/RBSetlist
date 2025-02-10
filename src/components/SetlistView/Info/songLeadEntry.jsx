import "../../../assets/SetlistView/Info/songLeadEntry.css";

export default function SongLeadEntry({leadData}) {

    return(

    <div className="songLeadEntry">

        <div className="songLeadLeft">
            <div className="songLeadRank">#{leadData.rank}</div>
            <div className="songLeadName">{leadData.name}</div>
        </div>

        <div className="songLeadRight">
            <div>{leadData.score}</div>
            <div className="songLeadRightBot">
                <div>{leadData.diff_id}</div>
                <div>{leadData.notes_pct}</div>
            </div>
        </div>

    </div>

    )

}