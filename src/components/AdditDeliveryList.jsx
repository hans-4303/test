import DaumPostcode from "react-daum-postcode";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { ADDIT_USER } from "../redux/reducers/signup";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../redux/reducers/user";

import "../css/deliveryList.css";
import "../style/Button";
import MyButton from "../style/Button";

const Postcode = (props) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let postCode = data.zonecode;
    let extraAddress = "";
    let extraPostCode = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
        extraPostCode += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
        extraPostCode +=
          extraPostCode !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      postCode += extraPostCode !== "" ? ` (${extraPostCode})` : "";
    }
    props.adressValue(fullAddress);
    props.zoneCodeValue(postCode);
  };

  return <DaumPostcode onComplete={handleComplete} {...props} />;
};

function AdditDeliveryList() {
  // user 정보
  const user = useSelector((state) => state.user);
  const signup = useSelector((state) => state.signup);
  const findUser = signup.userlist.find((userId) => userId.id === user.id);

  const [address, setAddress] = useState(user.address);
  const [zoneCode, setZoneCode] = useState(user.zoneCode);
  const [detailAddress, setDetailAddress] = useState(user.detailAddress);
  const [reference, setReference] = useState(user.reference);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const changeAddress = (e) => {
    setAddress(e.target.value);
  };
  const adressValue = (value) => {
    setAddress(value);
    handleClose();
  };
  const changeZoneCode = (e) => {
    setZoneCode(e.target.value);
  };
  const zoneCodeValue = (value) => {
    setZoneCode(value.split(" ")[0]);
    handleClose();
  };

  const submit = () => {
    handleOpen();
  };
  const relay = (e) => {
    e.preventDefault();
    Postcode();
    dispatch(
      ADDIT_USER({
        ...findUser,
        address,
        zoneCode,
        detailAddress,
        reference,
      })
    );
    dispatch(
      updateAddress({
        ...user,
        address,
        zoneCode,
        detailAddress,
        reference,
      })
    );
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    // inline style 추가(배송지form 위치)
    <div style={{ marginTop: "76px" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Postcode adressValue={adressValue} zoneCodeValue={zoneCodeValue} />
        </Box>
      </Modal>
      <form className="post-form" onSubmit={relay}>
        {/* <input
          className="post-form_btn"
          type="button"
          defaultValue="우편번호 찾기"
          onClick={submit}
        /> */}

        {/*float: left로 위치 조정 */}
        <div>
          <input
            type="text"
            className="post-form_input"
            id="sample6_postcode"
            onChange={changeZoneCode}
            name="zoneCode"
            placeholder="우편번호"
            value={zoneCode}
          />
          {/* input type:button -> button tag로 변경 */}
          <button className="post-form_btn" onClick={submit}>
            우편번호 찾기
          </button>
        </div>

        <input
          type="text"
          className="post-form_input"
          id="sample6_address"
          name="address"
          onChange={changeAddress}
          placeholder="주소"
          value={address}
        />

        <input
          type="text"
          className="post-form_input"
          id="sample6_detailAddress"
          name="detailAddress"
          onChange={(e) => {
            setDetailAddress(e.target.value);
          }}
          placeholder="상세주소"
          value={detailAddress}
        />
        <input
          type="text"
          className="post-form_input"
          id="sample6_extraAddress"
          name="reference"
          onChange={(e) => {
            setReference(e.target.value);
          }}
          value={reference}
        />
        {/* button component적용 */}
        <MyButton>배송지 변경</MyButton>
      </form>
    </div>
  );
}

export default AdditDeliveryList;
