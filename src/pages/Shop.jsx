import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [thumbNailList, setThumbNailList] = useState(null);
  const [category, setCategory] = useState("short");

  const getThumbNailList = async () => {
    let url = `https://my-json-server.typicode.com/hans-4303/test/productList`;
    let response = await fetch(url);
    let data = await response.json();
    setThumbNailList(data);
  };

  useEffect(
    () => {
      getThumbNailList();
    },
    [
      /* thumbNailList, 이렇게 되면 state에 따라 무한 렌더링된다. */
    ]
  );

  return (
    <div className="wrap">
      <h1>상품리스트</h1>
      <button
        onClick={() => {
          setCategory("short");
        }}
      >
        Short
      </button>
      <button
        onClick={() => {
          setCategory("long");
        }}
      >
        Long
      </button>
      <p>클릭하면 각 상품 상세 페이지로 이동</p>
      <ProductContainer>
        {/* {thumbNailList?.map((thumbNail) => (
          <div key={thumbNail.id}>
            <ProductCard thumbNail={thumbNail} />
          </div>
        ))} */}
        {category === "short"
          ? thumbNailList
              ?.filter((thumbNail) => thumbNail.id < 4)
              .map((thumbNail, index) => (
                <div key={thumbNail.id}>
                  <ProductCard thumbNail={thumbNail} />
                </div>
              ))
          : ""}
        {category === "long"
          ? thumbNailList
              ?.filter((thumbNail) => thumbNail.id >= 4)
              .map((thumbNail, index) => (
                <div key={thumbNail.id}>
                  <ProductCard thumbNail={thumbNail} />
                </div>
              ))
          : ""}
      </ProductContainer>
    </div>
  );
};

export default Shop;

const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
