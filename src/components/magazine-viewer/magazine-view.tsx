'use client';

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import dynamic from 'next/dynamic';

const ViewPDF = dynamic(() => import('./view-pdf'), { ssr: false });

const style = {
  box: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '100%',
    transform: 'translate(-50%, -50%)',
    p: 4,
    overflow: 'auto',
  },
};

export default function MagazineView({
  children,
  pdfUrl,
}: {
  children: React.ReactNode;
  pdfUrl: string | undefined;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        type="button"
        className="bg-opacity-20 hover:bg-opacity-25 float-right inline-flex items-center px-4 py-3 text-sm leading-6 font-semibold shadow-md disabled:opacity-50"
      >
        {children}
      </button>
      {pdfUrl != undefined && (
        <Modal
          className="bg-white"
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
              <ViewPDF pdfURL={pdfUrl} />
            </Box>
          </Fade>
        </Modal>
      )}
    </div>
  );
}
