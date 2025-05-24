import React, { useState } from 'react';
import axios from 'axios';

const NewAnimeModal = ({ visible, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    status: 'planned',
    progress: '',
    rating: '',
    tags: '' // 逗號分隔的字串
  });

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        progress: Number(formData.progress),
        rating: Number(formData.rating),
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      };

      await axios.post('http://localhost:5000/api/anime', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      onSuccess();
      onClose();
    } catch (err) {
      alert('新增動畫失敗');
      console.error('新增動畫失敗:', err);
    }
  };

  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>新增動畫</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" value={formData.title} onChange={handleChange} placeholder="動畫名稱" required style={styles.input} />
          <select name="status" value={formData.status} onChange={handleChange} style={styles.input}>
            <option value="planned">planned</option>
            <option value="watching">watching</option>
            <option value="completed">completetd</option>
          </select>
          <input name="progress" type="number" value={formData.progress} onChange={handleChange} placeholder="集數" style={styles.input} />
          <input name="rating" type="number" min="0" max="10" value={formData.rating} onChange={handleChange} placeholder="評分 0~10" style={styles.input} />
          <input name="tags" value={formData.tags} onChange={handleChange} placeholder="標籤（用 , 分隔）" style={styles.input} />

          <div style={styles.buttons}>
            <button type="submit">新增</button>
            <button type="button" onClick={onClose}>取消</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    background: '#1e1e1e',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px'
  },
  input: {
    width: '280px',
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between'
  }
};

export default NewAnimeModal;
