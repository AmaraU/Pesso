import MonoConnect from '@mono.co/connect.js';
import React, { useEffect } from 'react';

export default function ConnectWidget({ onSuccess, onClose, isOpen = false }) {
  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      onClose: onClose,
      onLoad: () => console.log('Widget loaded successfully'),
      onSuccess: onSuccess,
      key: "test_pk_eypa7n4aod07nxa4uv95"
    })

    monoInstance.setup()

    return monoInstance;
  }, []);

  useEffect(() => {
    if (isOpen) {
      monoConnect.open();
    }
  }, [isOpen]);

  return (
    <></>
  )
}