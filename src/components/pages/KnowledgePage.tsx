import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { DanhmcKinthc, KinthcvGitrThngd } from '@/entities';
import { Image } from '@/components/ui/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, GraduationCap, BarChart3, TrendingUp, DollarSign, Users, Building, Target } from 'lucide-react';

export default function KnowledgePage() {
  const [categories, setCategories] = useState<DanhmcKinthc[]>([]);
  const [articles, setArticles] = useState<KinthcvGitrThngd[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, articlesData] = await Promise.all([
          BaseCrudService.getAll<DanhmcKinthc>('danhmckinthc'),
          BaseCrudService.getAll<KinthcvGitrThngd>('kinthcvgitrthngd')
        ]);
        
        const activeCategories = categoriesData.items
          .filter(cat => cat.isActive)
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        
        const sortedArticles = articlesData.items
          .sort((a, b) => new Date(b.publishDate || 0).getTime() - new Date(a.publishDate || 0).getTime());
        
        setCategories(activeCategories);
        setArticles(sortedArticles);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary-foreground">Đang tải nội dung kiến thức...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="w-full bg-primary text-primary-foreground py-20 lg:py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            <Badge variant="outline" className="border-primary-foreground text-primary-foreground mb-8 text-sm">
              Kiến Thức Toàn Diện
            </Badge>
            <h1 className="font-heading text-5xl lg:text-6xl xl:text-7xl mb-8 leading-tight">
              Giá Trị Thặng Dư Trong Nền Kinh Tế Thị Trường
            </h1>
            <p className="font-paragraph text-xl lg:text-2xl opacity-90 leading-relaxed max-w-4xl mx-auto">
              Tìm hiểu toàn diện về khái niệm giá trị thặng dư, từ lý thuyết cơ bản đến ứng dụng thực tiễn trong nền kinh tế thị trường hiện đại.
            </p>
          </div>
        </div>
      </section>
      {/* Table of Contents */}
      <section className="w-full py-16 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl text-secondary-foreground mb-6">
              Nội Dung Chính
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-3xl mx-auto">
              Khám phá từng khía cạnh của giá trị thặng dư qua các chủ đề được sắp xếp có hệ thống
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const icons = [BookOpen, TrendingUp, BarChart3, GraduationCap];
              const IconComponent = icons[index % icons.length];
              
              return (
                <Card key={category._id} className="bg-background border-0 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <CardHeader className="text-center pb-4">
                    <div className="p-4 bg-primary/10 rounded-2xl w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-heading text-lg text-secondary-foreground">
                      {category.categoryName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-paragraph text-sm text-secondary-foreground/70 leading-relaxed">
                      {category.categoryDescription}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* Main Content Sections */}
      {articles.map((article, index) => {
        const isEven = index % 2 === 0;
        const sectionIcons = [DollarSign, Users, Building, Target, TrendingUp, BarChart3];
        const IconComponent = sectionIcons[index % sectionIcons.length];
        
        return (
          <section key={article._id} className={`w-full py-20 lg:py-24 ${isEven ? 'bg-background' : 'bg-secondary/30'}`}>
            <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <div className={!isEven ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      Phần {index + 1}
                    </Badge>
                  </div>
                  <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl text-secondary-foreground mb-6 leading-tight">
                    {article.title}
                  </h2>
                  {article.summary && (
                    <div className="mb-8">
                      <h3 className="font-heading text-xl text-secondary-foreground mb-4">Tóm tắt</h3>
                      <p className="font-paragraph text-lg text-secondary-foreground/80 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                  )}
                  {article.content && (
                    <div className="prose prose-lg max-w-none">
                      <div className="font-paragraph text-secondary-foreground/90 leading-relaxed whitespace-pre-line">
                        {article.content}
                      </div>
                    </div>
                  )}

                </div>
                
                {/* Image */}
                {article.mainImage && (
                  <div className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="relative">
                      <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                        <Image
                          src={article.mainImage}
                          alt={article.title || 'Hình ảnh minh họa'}
                          className="w-full h-full object-cover"
                          width={600}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Section Separator */}
            {index < articles.length - 1 && (
              <div className="max-w-[100rem] mx-auto px-6 lg:px-8 mt-20">
                <Separator className="bg-secondary-foreground/10" />
              </div>
            )}
          </section>
        );
      })}
      {/* Summary Section */}
      <section className="w-full py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl mb-8 leading-tight">
              Kết Luận
            </h2>
            <p className="font-paragraph text-xl lg:text-2xl opacity-90 leading-relaxed mb-12">
              Giá trị thặng dư là một khái niệm quan trọng trong kinh tế học, giúp chúng ta hiểu rõ hơn về 
              cách thức hoạt động của thị trường và phân phối giá trị trong nền kinh tế.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="p-4 bg-primary-foreground/10 rounded-2xl w-fit mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl mb-3">Lý Thuyết</h3>
                <p className="font-paragraph text-primary-foreground/80">
                  Nắm vững các khái niệm cơ bản về giá trị thặng dư
                </p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-primary-foreground/10 rounded-2xl w-fit mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl mb-3">Ứng Dụng</h3>
                <p className="font-paragraph text-primary-foreground/80">
                  Áp dụng kiến thức vào thực tiễn kinh tế
                </p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-primary-foreground/10 rounded-2xl w-fit mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl mb-3">Phát Triển</h3>
                <p className="font-paragraph text-primary-foreground/80">
                  Tiếp tục nghiên cứu và phát triển hiểu biết
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}