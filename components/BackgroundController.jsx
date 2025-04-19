'use client'

import { Slider } from '@/components/ui/slider'
import React, { useContext, useEffect, useState } from 'react'
import ColorPickerController from './ColorPickerController'
import { ControllerValueContext } from '@/context/ControllerValueContext';

function BackgroundController() {
  const { setValue } = useContext(ControllerValueContext);
  const [mounted, setMounted] = useState(false);

  const [rounded, setRounded] = useState(250);
  const [padding, setPadding] = useState(40);
  const [color, setColor] = useState('#000');

  // Wait until client mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const storageValue = JSON.parse(localStorage.getItem('value'));
    if (storageValue) {
      setRounded(storageValue.bgRounded || 250);
      setPadding(storageValue.bgPadding || 40);
      setColor(storageValue.bgColor || '#000');
      setValue(storageValue);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      const updatedValue = {
        bgRounded: rounded,
        bgPadding: padding,
        bgColor: color,
      };
      localStorage.setItem('value', JSON.stringify(updatedValue));
      setValue(updatedValue);
    }
  }, [rounded, padding, color, mounted]);

  if (!mounted) return null; // Prevent SSR mismatch

  return (
    <div>
      <div className='py-3'>
        <label className='p-2 flex justify-between my-2 text-sm'>
          Rounded <span>{rounded} px</span>
        </label>
        <Slider defaultValue={[rounded]} max={512} step={1} onValueChange={(e) => setRounded(e[0])} />
      </div>
      <div className='py-3'>
        <label className='p-2 flex justify-between my-2 text-sm'>
          Padding <span>{padding} px</span>
        </label>
        <Slider defaultValue={[padding]} max={100} step={1} onValueChange={(e) => setPadding(e[0])} />
      </div>
      <div className='py-3'>
        <label className='p-2 flex justify-between my-2 text-sm'>Background</label>
        <ColorPickerController hideControls={false} selectedColor={(v) => setColor(v)} />
      </div>
    </div>
  );
}

export default BackgroundController;
