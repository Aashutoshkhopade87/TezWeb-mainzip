import { useEffect, useState } from 'react';
import { getAnalytics, getAnalyticsSummary, getViewsByDay } from '@/lib/analytics';
import { WebsiteData } from '@/types/website';
import { Eye, MessageCircle, TrendingUp, Calendar, Package, Award, Phone, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnalyticsViewProps {
  website: WebsiteData;
  onClose: () => void;
}

export default function AnalyticsView({ website, onClose }: AnalyticsViewProps) {
  const [summary, setSummary] = useState({
    totalViews: 0,
    totalWhatsAppClicks: 0,
    totalCallClicks: 0,
    topProducts: [] as any[],
    recentActivity: [] as any[],
  });
  const [viewsByDay, setViewsByDay] = useState<{ date: string; views: number }[]>([]);

  useEffect(() => {
    const analytics = getAnalytics(website.id);
    if (analytics) {
      setSummary(getAnalyticsSummary(website.id));
      setViewsByDay(getViewsByDay(website.id));
    }
  }, [website.id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const maxViews = Math.max(...viewsByDay.map(d => d.views), 1);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Analytics Dashboard
              </h2>
              <p className="text-blue-100">{website.businessName}</p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              Close
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-1">Total Views</p>
                  <p className="text-3xl font-bold text-blue-900">
                    {summary.totalViews.toLocaleString()}
                  </p>
                </div>
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
                  <Eye className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">WhatsApp Clicks</p>
                  <p className="text-3xl font-bold text-green-900">
                    {summary.totalWhatsAppClicks.toLocaleString()}
                  </p>
                </div>
                <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600 mb-1">Call Clicks</p>
                  <p className="text-3xl font-bold text-purple-900">
                    {summary.totalCallClicks?.toLocaleString() || 0}
                  </p>
                </div>
                <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center">
                  <Phone className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Views by Day Chart */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-bold text-gray-900">Last 7 Days</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <div className="flex items-end justify-between gap-2 h-40">
                {viewsByDay.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="flex-1 w-full flex items-end justify-center">
                      <div
                        className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg w-full max-w-[60px] transition-all hover:from-blue-700 hover:to-blue-500"
                        style={{
                          height: `${(day.views / maxViews) * 100}%`,
                          minHeight: day.views > 0 ? '8px' : '0px',
                        }}
                        title={`${day.views} views`}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-semibold text-gray-900">{day.views}</p>
                      <p className="text-xs text-gray-500">{formatDate(day.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          {summary.topProducts.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-bold text-gray-900">Top Performing Products</h3>
              </div>
              <div className="space-y-3">
                {summary.topProducts.map((product, index) => (
                  <div
                    key={product.productId}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                          style={{
                            backgroundColor:
                              index === 0
                                ? '#FFD700'
                                : index === 1
                                ? '#C0C0C0'
                                : index === 2
                                ? '#CD7F32'
                                : website.primaryColor,
                          }}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {product.productName}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {product.views} views
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {product.whatsappClicks} clicks
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {product.views + product.whatsappClicks}
                        </p>
                        <p className="text-xs text-gray-500">total engagement</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          {summary.recentActivity.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 max-h-64 overflow-y-auto">
                <div className="space-y-2">
                  {summary.recentActivity.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-100"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          event.type === 'view'
                            ? 'bg-blue-100'
                            : event.type === 'whatsapp_click'
                            ? 'bg-green-100'
                            : event.type === 'call_click'
                            ? 'bg-purple-100'
                            : event.type === 'directions_click'
                            ? 'bg-indigo-100'
                            : 'bg-orange-100'
                        }`}
                      >
                        {event.type === 'view' && <Eye className="w-4 h-4 text-blue-600" />}
                        {event.type === 'whatsapp_click' && (
                          <MessageCircle className="w-4 h-4 text-green-600" />
                        )}
                        {event.type === 'call_click' && (
                          <Phone className="w-4 h-4 text-purple-600" />
                        )}
                        {event.type === 'directions_click' && (
                          <Navigation className="w-4 h-4 text-indigo-600" />
                        )}
                        {event.type === 'product_view' && (
                          <Package className="w-4 h-4 text-orange-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {event.type === 'view' && 'Website Viewed'}
                          {event.type === 'whatsapp_click' &&
                            `WhatsApp Click: ${event.productName}`}
                          {event.type === 'call_click' && 'Call Button Clicked'}
                          {event.type === 'directions_click' && 'Directions Requested'}
                          {event.type === 'product_view' && `Product Viewed: ${event.productName}`}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 whitespace-nowrap">
                        {formatTime(event.timestamp)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {summary.totalViews === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Data Yet</h3>
              <p className="text-gray-600 mb-4">
                Share your website to start tracking views and engagement
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
