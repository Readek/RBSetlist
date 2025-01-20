export default function SongInList({songData}) {

    return(<>

    <div key={songData.reactId}>
        {songData.artist} | {songData.name} | {songData.duration}
    </div>

    </>)

}