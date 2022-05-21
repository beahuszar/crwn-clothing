import React, {FC} from "react";
import {BackgroundImage, DirectoryItemContainer, ItemBody} from "./directory-item.styles";
import {useNavigate} from "react-router-dom";
import {DirectoryCategory} from "../directory/directory.component";

type DirectoryItemProps = {
    category: DirectoryCategory
}

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
  const { imageUrl, title, route } = category;

  const navigate = useNavigate();

  const onNavigate = () => navigate(route);
  return (
    <DirectoryItemContainer onClick={onNavigate}>
      <BackgroundImage imageUrl={imageUrl}/>
      <ItemBody>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </ItemBody>
    </DirectoryItemContainer>
  )
};

export default DirectoryItem;
