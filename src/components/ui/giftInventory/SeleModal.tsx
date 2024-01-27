import React, { useState } from "react";
import { Button, Modal } from "antd";
import GForm from "../../form/GForm";
import GInput from "../../form/GInput";
import { FieldValues } from "react-hook-form";
import GDatePicker from "../../form/GDatePicker";
import { useAddSaleMutation } from "../../../redux/features/sale/saleApi";
import toast from "react-hot-toast";
import Loader from "../loader/Loader";

const SaleModal = ({ giftId }: { giftId: string }) => {
  console.log(giftId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addSale, { data, isLoading, isError }] = useAddSaleMutation();

  console.log("add sale", data, isLoading, isError);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // handle sell
  const handleSellSubmit = async (data: FieldValues) => {
    try {
      const saleInfo = {
        giftId: giftId,
        quantity: parseInt(data.quantity),
        buyerName: data.buyerName,
        date: data.date,
      };
      const res = await addSale(saleInfo).unwrap();
      if (res.success) {
        toast.success("Gift sale successfully");
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error(error.data.errorMessage);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      {" "}
      <Button
        // style={{ backgroundColor: "#1677FF", color: "white" }}
        onClick={showModal}
      >
        Sale
      </Button>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={""}
      >
        <GForm onSubmit={handleSellSubmit}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <GInput type={"number"} name={"quantity"} label={"Quantity"} />
              <GInput type={"text"} name={"buyerName"} label={"Buyer Name"} />
              <GDatePicker name="date" label="Select Date" />
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button htmlType="submit">Sale</Button>
              </div>
            </div>
          </div>
        </GForm>
      </Modal>
    </div>
  );
};

export default SaleModal;