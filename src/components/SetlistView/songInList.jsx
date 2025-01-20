export default function SongInList({songData}) {

    return(<>

    <div>
        {songData.artist} | {songData.name} | {songData.duration}
    </div>

    </>)

}