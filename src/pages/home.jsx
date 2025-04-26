import Head from 'next/head';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Mic, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const categories = ['Haber', 'Finans', 'Hava Durumu', 'Spor'];

  return (
    <>
      <Head>
        <title>DokumanJet - Yapay Zeka Destekli Arama Motoru</title>
        <meta name="description" content="DokumanJet: Belgelerinize jet hızıyla ulaşın" />
      </Head>

      <main className="min-h-screen bg-white flex flex-col items-center p-6">
        {/* Logo & Başlık */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-8"
        >
          <Image src="/logo.png" alt="DokumanJet Logo" width={120} height={120} />
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900">
            Yapay Zeka Destekli Arama Motoru
          </h1>
        </motion.div>

        {/* Arama Çubuğu */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-2xl flex items-center space-x-2 mb-8"
        >
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Ara..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button className="px-6 py-2">Ara</Button>
          <Button variant="outline" className="px-4 py-2">
            <Mic className="mr-1" /> Sesle Ara
          </Button>
          <Button variant="outline" className="px-4 py-2">
            <ImageIcon className="mr-1" /> Görsel Ara
          </Button>
        </motion.div>

        {/* Kategori Menüsü */}
        <motion.nav
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex space-x-6 mb-12"
        >
          {categories.map((cat) => (
            <Button key={cat} variant="ghost" className="text-lg">
              {cat}
            </Button>
          ))}
        </motion.nav>

        {/* Kartlar Düzeni */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* Haber Akışı */}
          <Card>
            <CardHeader>
              <CardTitle>Güncel Haberler</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Burada RSS veya API'den çekilen haberler listelenecek */}
              <ul className="space-y-2">
                <li>Örnek Haber Başlığı 1</li>
                <li>Örnek Haber Başlığı 2</li>
                <li>Örnek Haber Başlığı 3</li>
              </ul>
            </CardContent>
          </Card>

          {/* Hava Durumu */}
          <Card>
            <CardHeader>
              <CardTitle>Hava Durumu</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Gerçek API entegrasyonu ile güncel hava durumu */}
              <div className="flex items-center space-x-2">
                <Image src="/weather-icon.png" alt="Weather" width={32} height={32} />
                <div>
                  <p className="text-lg font-semibold">İstanbul</p>
                  <p>18°C • Açık</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ziyaretçi Sayacı */}
          <Card>
            <CardHeader>
              <CardTitle>Ziyaretçi Sayısı</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">12.345</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
