import React from "react";

export interface IListProps<TItem> {
  items: TItem[];
  renderItem: (item: TItem) => React.ReactNode;
  empty: React.ReactNode;
}

export const List = <TItem extends { id: React.Key }>(
  props: IListProps<TItem>
) => {
  const { items, renderItem, empty } = props;
  return (
    <>
      {items.length > 0
        ? items.map((item) => (
            <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
          ))
        : empty}
    </>
  );
};
