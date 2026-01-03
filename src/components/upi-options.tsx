'use client';

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { UPI_APPS } from '~/constants/payment';
import Image from 'next/image';

const style = {
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 320,
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: 3,
    outline: 'none',
  },
};

function UPIOptions() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <button
        className="rounded-lg bg-[#E73030] px-4 py-2 text-xl font-bold text-white transition-transform hover:scale-105 active:scale-95"
        onClick={handleOpen}
      >
        ₹ ದೇಣಿಗೆ ನೀಡಿ
      </button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style.box}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Select Payment App
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {UPI_APPS.map((app) => (
                  <a
                    key={app.name}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-xl border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-100">
                      <Image
                        src={app.icon}
                        alt={app.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <span className="text-lg font-medium text-gray-700">
                      {app.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default UPIOptions;
