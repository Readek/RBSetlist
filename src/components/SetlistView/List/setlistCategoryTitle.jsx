import { useTranslation } from "react-i18next";

export default function setlistCategoryTitle({name, count}) {

    const { t } = useTranslation();

    return(

    <div className="setlistListCategoryHeader">

        <span className="setlistListCategoryName">
            {name}
        </span>

        <span className="setlistListCategorySecon">
            {t("setlistListCatCount", {count: count})}
        </span>

    </div>

    )

}