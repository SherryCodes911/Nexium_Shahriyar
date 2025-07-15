import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
const translate = require('translate-google');
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: Request) {
  console.log('✅ /api/summarize HIT');
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    let text = $('article').text().trim();
    if (!text) text = $('div.content').text().trim();
    if (!text) text = $.text().trim();

    if (!text || text.length < 50) {
      return NextResponse.json({ error: 'Unable to extract text from the blog' }, { status: 400 });
    }

    const words = text.split(' ');
    const summaryEnglish = words.slice(0, 100).join(' ') + '...';

    const summaryUrdu = await translate(summaryEnglish, { to: 'ur' });

    // ✅ Insert into Supabase
    const { error: supabaseError } = await supabase.from('summaries').insert({
      blog_url: url,
      summary_urdu: summaryUrdu,
    });

    if (supabaseError) {
      console.error('❌ Supabase error:', supabaseError);
      // Don't stop the app; just log it
    }

    return NextResponse.json({
      summary: summaryUrdu,
      summary_english: summaryEnglish,
    });
  } catch (err) {
    console.error('❌ Error:', err);
    return NextResponse.json({ error: 'Failed to summarize' }, { status: 500 });
  }
}
