# Panteon Case Study - Lider Tablosu Dağıtım Sistemi

Bu proje, **Panteon** için geliştirilmiş bir **case çalışması** olup, bir lider tablosu dağıtım sistemini simüle etmektedir. Sistem, oyuncuların lider tablosunu görüntülemesine, çeşitli özelliklere göre oyuncuları filtrelemesine ve grup yapmasına, ayrıca ödül havuzunun dağıtımını yönetmesine olanak tanır.

![image](https://github.com/user-attachments/assets/028445d5-bf57-49ec-a0e9-3e41cd4b5729)


## Proje Özeti

Lider tablosu sistemi aşağıdaki özelliklere sahiptir:
- **Oyuncu Id Arama**: Bir oyun içinde birden fazla aynı isimde oyuncu olabilme ihtimali olduğu için oyuncu araması ID üzerinden gerçekleşmektedir. Lütfen arayacağınız oyuncunun numarası yerine idsini arayın.
- **Lider Tablosu Görüntüleme**: Oyuncuları ranklarına göre sıralar ve oyuncu ismi, ülke, para gibi kriterlerle filtreleme seçenekleri sunar.
- **Oyuncu Arama**: Bir oyuncuyu ID'ye göre arayarak sıralamasını öğrenebilirsiniz.
- **Ülkeye Göre Gruplama**: Oyuncuları ülkeye göre gruplandırarak bölgesel performans analizleri yapın.
- **Ödül Dağıtımı**: Ödül havuzunu en üst sıradaki oyunculara dağıtın ve sonraki hafta için havuzu sıfırlayın.
- **Sonraki Haftayı Simüle Etme**: "Sonraki Hafta" butonuna tıklayarak lider tablosunu yeni bir haftaya taşıyın ve yeni dağıtım turu için verileri yenileyin.

### Kullanılan Teknolojiler:
- **React**: Kullanıcı arayüzünü oluşturmak için kullanıldı.
- **TypeScript**: Statik tip desteği sağlayarak hataları azaltmak için kullanıldı.
- **Styled Components**: Projedeki CSS stillerini yönetmek için kullanıldı.
- **React Icons**: Arayüzü geliştirmek için ikonlar eklendi.
- **React Toastify**: Ödül dağıtımı ve hata bildirimleri gibi kullanıcı bilgilendirmeleri için kullanıldı.

## Özellikler:
- **Lider Tablosu Görüntüleme**: En iyi oyuncuların listesini sıralama ve filtreleme seçenekleriyle görün.
- **Ödül Dağıtımı**: Ödül havuzunu en üst sıradaki oyunculara dağıtın ve sonraki tur için sıfırlayın.
- **Sonraki Haftayı Simüle Etme**: Sonraki haftaya geçiş yaparak lider tablosunu yenileyin.
- **Responsive Tasarım**: Uygulama, farklı cihaz boyutlarında tamamen Responsive olacak şekilde tasarlanmıştır.

## Kurulum Kılavuzu

Projeyi yerel olarak çalıştırmak için aşağıdaki adımları izleyin:

### 1. Depoyu Klonlayın
```
git clone git@github.com:ekinkoseoglu/panteon-leaderboard-frontend.git
```
### 2. Proje dizinine gidin
```
cd proje-dizini
```


### 3. Bağımlılıkları yükleyin
```
npm install
```


### 4. Geliştirme sunucusunu başlatın
```
npm run dev
```


Uygulama `http://localhost:3001` adresinde çalışıyor olacaktır.


## Ek Bilgiler

- **Ödül Havuzunu Dağıtma**: En üst sıradaki oyunculara ödül havuzunu dağıtmak için butona tıklayın.
- **Sıfırlama ve Güncelleme**: Her hafta, lider tablosu yeni oyuncular ve sıralamalarla yenilenir, bu da gerçek zamanlı bir senaryo simülasyonu yapar.


Kodu inceleyebilir ve özelleştirme yapmak için düzenlemeler yapabilirsiniz!
