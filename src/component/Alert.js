import React, { useEffect } from 'react';

export default function Alert(props) {
  useEffect(() => {
    if (props.alert) {
      const toastEl = document.getElementById('liveToast');
      const toast = new window.bootstrap.Toast(toastEl);
      toast.show();
    }
  }, [props.alert]);

  return (
    <div>
      {props.alert && (
        <div className="toast-container position-fixed top-0 end-0 p-4">
          <div id="liveToast" className={`toast bg-${props.alert.type}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className='toast-body'>
              {props.alert.msg}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
