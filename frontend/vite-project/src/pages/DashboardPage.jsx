import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NewAnimeModal from '../components/animeModal';


const DashboardPage = () => {
  const [animes, setAnimes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(false); // 觸發清單重整
  const [selectedFiles, setSelectedFiles] = useState({});


  const token = localStorage.getItem('token');

  const handleAddSuccess = () => {
  setReloadFlag(!reloadFlag); // 刷新清單用
};

const handleFileSelect = (e, animeId) => {
  const file = e.target.files[0];
  if (!file) return;
  setSelectedFiles(prev => ({ ...prev, [animeId]: file }));
};

const handleImageUpload = async (e, animeId) => {
  e.preventDefault();
  const file = selectedFiles[animeId];
  if (!file) return alert('請先選擇圖片');

  const formData = new FormData();
  formData.append('image', file);

  try {
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:5000/api/anime/${animeId}/upload-image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    setReloadFlag(flag => !flag); // 觸發重新拉資料（可優化為局部更新）
  } catch (err) {
    alert('圖片上傳失敗');
  }
};


  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const fetchAnimes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/anime', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAnimes([...res.data.data]);
        console.log('取得動畫清單:', res.data.data);
        console.log('animes:', animes.image);
        setError(''); // 清除錯誤訊息
      } catch (err) {
        setError('無法取得動畫清單');
      }
    };

    fetchAnimes();
  }, [token, navigate, reloadFlag]); // 依賴 reloadFlag 來觸發清單重整

  return (
    <div style={{ margin: '30px auto', justifyContent: 'center', marginRight: '20px' }}>
        <button onClick={() => setShowModal(true)}>新增動畫</button>

        <NewAnimeModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            onSuccess={handleAddSuccess}
        />
      <h2>我的動畫清單</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ justifyContent: 'center'}}>
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', width: '80vw', }}>
            {animes.map((anime) => (
                <div 
                    key={anime._id} 
                    style={{ 
                        border: '1px solid #ccc', 
                        margin: '10px 0', 
                        padding: '10px',
                        verticalAlign: 'top',
                        display: 'inline-block',
                        marginRight: '10px',
                        minWidth: '200px',
                        // maxWidth: '100vw'
                    }}
                >
                <h3>{anime.title}</h3>
                <p>狀態：{anime.status}</p>
                <p>進度：{anime.progress} 集</p>
                <p>評分：{anime.rating}/10</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}>
                    {anime.images && anime.images.map((img, idx) => (
                        <img
                        key={idx}
                        src={`http://localhost:5000${img}`}
                        alt={`${img}`}
                        style={{ maxWidth: '400px', maxHeight: '200px' }}
                        />
                    ))}
                </div>
                <form onSubmit={(e) => handleImageUpload(e, anime._id)} style={{ marginTop: '10px' }}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, anime._id)}
                        style={{ marginBottom: '5px' }}
                    />
                    <button type="submit">上傳圖片</button>
                </form>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
