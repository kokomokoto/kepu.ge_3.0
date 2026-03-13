# Cloudflare Pages Deploy Guide

## სტრუქტურა

- index.html, contact.html, about.html და სხვა HTML ფაილები
- static/ (style.css, images, js)
- projects/ (სურათები, PNG, JPG)
- uploads/ (სურათები თუ გჭირდება)

## ატვირთვის ნაბიჯები

1. ატვირთე ეს ფოლდერი GitHub-ზე (ან პირდაპირ ZIP-ით Cloudflare Pages-ზე)
2. Cloudflare Dashboard → Pages → Create Project → აირჩიე GitHub repo ან ატვირთე ZIP
3. Deploy

## შეზღუდვები
- არ მუშაობს დარეგისტრირება, კომენტარები, ლაიქები, ანალიტიკა (ბექენდის გარეშე)
- მხოლოდ სტატიკური გვერდები, სურათები და JS

## Custom Domain
- Cloudflare Pages-ში შეგიძლია დაამატო საკუთარი დომენი (www.kepu.ge)

## Google Analytics
- თუ გინდა GA4, ჩასვი <script> კოდი HTML-ში

## დახმარება
თუ გინდა, მომწერე და დაგეხმარები deploy-ში ან custom domain-ის დაყენებაში.