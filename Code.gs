function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Fadhil GAME - Pusat Arcade')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
}

// Otomatis membuat atau mengambil tab sheet aktif
function getSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (sheetName === 'Users') {
      sheet.appendRow(['Username', 'Password', 'Created_At']);
      sheet.getRange('A1:C1').setFontWeight('bold');
    } else if (sheetName === 'Scores') {
      sheet.appendRow(['Username', 'Game', 'Score', 'Played_At']);
      sheet.getRange('A1:D1').setFontWeight('bold');
    }
  }
  return sheet;
}

// API Pendaftaran Akun
function registerUser(username, password) {
  try {
    const u = String(username).trim();
    const p = String(password).trim();

    if (!u || !p) {
      return { success: false, message: "Nama & Password tidak boleh kosong!" };
    }

    const sheet = getSheet('Users');
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]).toLowerCase() === u.toLowerCase()) {
        return { success: false, message: "Nama pemain sudah terdaftar!" };
      }
    }

    sheet.appendRow([u, p, new Date()]);
    return { success: true, message: "Pendaftaran berhasil! Silakan login." };
  } catch (err) {
    return { success: false, message: "Error sistem: " + err.message };
  }
}

// API Login Akun
function loginUser(username, password) {
  try {
    const u = String(username).trim().toLowerCase();
    const p = String(password).trim();

    const sheet = getSheet('Users');
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
      const dbUser = String(data[i][0]).trim();
      const dbPass = String(data[i][1]).trim();

      if (dbUser.toLowerCase() === u && dbPass === p) {
        return { success: true, username: dbUser };
      }
    }

    return { success: false, message: "Nama atau Password salah!" };
  } catch (err) {
    return { success: false, message: "Error sistem: " + err.message };
  }
}

// Simpan Skor beserta Nama Game ke Google Sheets
function saveGameScore(username, gameTitle, score) {
  try {
    if (!username || score === undefined) return { success: false };
    const sheet = getSheet('Scores');
    const gName = gameTitle || 'Neon Dodger';
    sheet.appendRow([String(username).trim(), gName, Number(score), new Date()]);
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

// Mengambil Data Dashboard & Leaderboard (Deduplikasi skor tertinggi per pemain per game)
function getDashboardData() {
  try {
    const userSheet = getSheet('Users');
    const scoreSheet = getSheet('Scores');

    const usersData = userSheet.getDataRange().getValues();
    const totalPlayers = Math.max(0, usersData.length - 1);

    const scoresData = scoreSheet.getDataRange().getValues();
    const totalPlayed = Math.max(0, scoresData.length - 1);

    // Kumpulkan skor dan lakukan deduplikasi: hanya simpan skor tertinggi tiap pemain di setiap game
    const bestScoresMap = {};

    for (let i = 1; i < scoresData.length; i++) {
      const row = scoresData[i];
      const u = String(row[0]).trim();
      let g = "Neon Dodger";
      let s = 0;
      let d = row[row.length - 1];

      // Penyesuaian kolom riwayat
      if (typeof row[1] === 'number') {
        s = Number(row[1]) || 0;
      } else {
        g = String(row[1]).trim() || "Neon Dodger";
        s = Number(row[2]) || 0;
      }

      if (u) {
        let dateStr = "-";
        if (d instanceof Date) {
          dateStr = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
        }

        // Kunci pembeda: Nama Pemain + Game
        const key = u.toLowerCase() + "___" + g.toLowerCase();
        if (!bestScoresMap[key] || s > bestScoresMap[key].score) {
          bestScoresMap[key] = {
            username: u,
            game: g,
            score: s,
            date: dateStr
          };
        }
      }
    }

    // Ubah hasil deduplikasi ke bentuk array lalu urutkan dari skor tertinggi
    const scoresList = Object.keys(bestScoresMap).map(k => bestScoresMap[k]);
    scoresList.sort((a, b) => b.score - a.score);

    return {
      success: true,
      totalPlayers: totalPlayers,
      totalPlayed: totalPlayed,
      totalGames: 2, // Neon Dodger & Space Blaster
      leaderboard: scoresList.slice(0, 25), // 25 Rekor tertinggi tanpa tumpukan
      topPlayers: scoresList.slice(0, 5)     // 5 Besar untuk widget Home
    };
  } catch (err) {
    return {
      success: false,
      totalPlayers: 0,
      totalPlayed: 0,
      totalGames: 2,
      leaderboard: [],
      topPlayers: []
    };
  }
}