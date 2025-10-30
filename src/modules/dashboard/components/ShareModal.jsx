import { Modal, Input, Button, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
  XIcon,
} from "react-share";
import "../styles/shareModal.css";

const ShareModal = ({ open, onCancel, shareUrl, title }) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        message.success("Link copied to clipboard!");
      })
      .catch(() => {
        message.error("Failed to copy link");
      });
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      closeIcon={<CloseOutlined />}
      centered
      width={480}
      className="share-modal"
      title={<span className="share-modal-title">Share</span>}
    >
      <div className="share-modal-content">
        {/* Social Media Icons */}
        <div className="share-icons-container">
          <div className="share-icon-wrapper">
            <TelegramShareButton
              url={shareUrl}
              title={title}
              className="share-button"
            >
              <TelegramIcon size={56} round />
            </TelegramShareButton>
          </div>

          <div className="share-icon-wrapper">
            <WhatsappShareButton
              url={shareUrl}
              title={title}
              className="share-button"
            >
              <WhatsappIcon size={56} round />
            </WhatsappShareButton>
          </div>

          <div className="share-icon-wrapper">
            <EmailShareButton
              url={shareUrl}
              subject={title}
              body={`Check out this dashboard: ${shareUrl}`}
              className="share-button"
            >
              <div className="custom-email-icon">
                <EmailIcon size={56} round />
              </div>
            </EmailShareButton>
          </div>
        </div>

        {/* Copy Link Section */}
        <div className="copy-link-section">
          <Input value={shareUrl} readOnly className="share-url-input" />
          <Button type="primary" onClick={handleCopy} className="copy-button">
            Copy
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
