import { server$ } from '@builder.io/qwik-city';
import Jimp from 'jimp';
import { Octokit } from '@octokit/core';

export interface UploadFileProps {
  file: File;
  username: string;
  email: string;
  category1: string;
  category2: string;
}

const octokit = new Octokit({ 
   auth: '' 
 }); 
  
 export const gitput = async ({ buffer, width, height, username, email, filename, category1, category2 }) => { 
   const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', { 
     owner: 'OWNER', 
     repo: 'REPO', 
     path: `${category1}/${category2}`, 
     message: `uploaded ${filename}`, 
     committer: { 
       name: username, 
       email: email 
     }, 
     content: `{ 
       data: ${buffer}, 
       width: ${width}, 
       height: ${height} 
     }`, 
   }); 
   return `https://wygin.me/${response.content.path}`; 
 } 
  
 export const gitget = async ({ path: string }) => { 
   const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', { 
     owner: 'OWNER', 
     repo: 'REPO', 
     path: path, 
     headers: { 
       'X-GitHub-Api-Version': '2022-11-28', 
       'Accept': 'application/vnd.github.raw' 
     } 
   }); 
   return response; 
 } 

export const uploadFile = server$(({  }) => {
  let difUrl = ''; 
  let gitUrls = [];
  const filename = file.value.split(/(\\|\/)/g).pop();

  const sizes = [225, 300, 350, 400, 450, 600, 675, 700, 800, 900, 1025, 1200]; 
  let difImage = Jimp.read(file); 
  const defWidth = Jimp.bitmap.width; 
  const defHeight = Jimp.bitmap.height; 
  const defBuffer = await difImage.getBufferAsync(Jimp.MIME_PNG); 
  difUrl = gitput(defBuffer, defWidth, defHeight, username, email, filename, category1, category2); 
  sizes.map(async (size) => { 
    let image = Jimp.read(file); 
    await image.resize(size, Jimp.AUTO); 
    const width = image.bitmap.width; 
    const height = image.bitmap.height; 
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG); 
    gitUrls.push(gitput(buffer, width, height, username, email, filename, category1, category2)); 
  }); 
 
  const getResponse = () => { 
    let response = {}; 
    response['default'] = difUrl; 
    sizes.map((size, index) => { 
      response[size] = gitUrls[index]; 
    }); 
    return response; 
  } 
 
  return getResponse();
});
